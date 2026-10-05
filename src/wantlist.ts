import withBrowserContext from 'scrapers/browser-context'
import type WantlistResultApi from 'interfaces/api/wantlist-result.api.interface'
import type { Browser, BrowserContext } from 'patchright'

/** Wants per page of the Discogs API */
const API_PER_PAGE = 500

/** Wants per page of the wantlist page */
const PAGE_PER_PAGE = 250

/**
 * Options to get the releases of a wantlist: either from the Discogs API, possibly with a token, or only the ones for sale
 */
export type WantlistOptions =
    | {
          /**
           * Discogs personal access token, to read a private wantlist and get a higher rate limit.
           * @see {@link https://www.discogs.com/settings/developers}
           */
          token?: string
          onlyForSale?: never // eslint-disable-line jsdoc/require-jsdoc
      }
    | {
          token?: never // eslint-disable-line jsdoc/require-jsdoc
          /**
           * If true, only the releases currently for sale are returned, read from the public wantlist page with a browser.
           * @default false
           */
          onlyForSale?: boolean
      }

/**
 * Get the release IDs from every page of a wantlist: the first page tells how many there are, the others are fetched
 * in parallel.
 * @param getPage Get the release IDs of a page, and the total number of pages
 * @returns Release IDs
 */
async function getAllPages(
    getPage: (pageNumber: number) => Promise<{
        /** Release IDs */
        ids: Array<number>
        /** Total number of pages */
        pages: number
    }>,
): Promise<Array<number>> {
    const firstPage = await getPage(1)
    const otherPages = await Promise.all(Array.from({ length: firstPage.pages - 1 }, (_, i) => getPage(i + 2)))

    return [...new Set([firstPage, ...otherPages].flatMap(x => x.ids))]
}

/**
 * Get the IDs of the releases of a wantlist, from the Discogs API.
 * @param username Username whose wantlist is read
 * @param token Discogs personal access token
 * @returns Release IDs
 */
function fetchWantlist(username: string, token?: string): Promise<Array<number>> {
    return getAllPages(async pageNumber => {
        const response = await fetch(
            `https://api.discogs.com/users/${encodeURIComponent(username)}/wants?${new URLSearchParams({
                page: pageNumber.toString(),
                per_page: API_PER_PAGE.toString(),
            }).toString()}`,
            {
                headers: {
                    'User-Agent': `DiscogsMarketplaceApiNodeJS-${username}`,
                    ...(token ? { Authorization: `Discogs token=${token}` } : {}),
                },
            },
        )

        const json = (await response.json().catch(() => null)) as WantlistResultApi | null

        if (!response.ok) {
            throw new Error(json?.message ?? `An error ${response.status} occurred.`)
        }

        return {
            ids: json?.wants?.map(x => x.id ?? 0).filter(x => !!x) ?? [],
            pages: json?.pagination?.pages ?? 0,
        }
    })
}

/**
 * Get the IDs of the releases of a wantlist that are currently for sale, from the wantlist page.
 * @param username Username whose wantlist is read
 * @param browserContext Patchright browser context
 * @returns Release IDs
 */
function scrapeWantlist(username: string, browserContext: BrowserContext): Promise<Array<number>> {
    return getAllPages(async pageNumber => {
        const browserPage = await browserContext.newPage()

        try {
            // The total is read from the English text of the page ("1 – 250 of 1,234")
            await browserPage.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' })
            await browserPage.route('**/*', route => (route.request().resourceType() === 'document' ? route.continue() : route.abort()))

            const response = await browserPage.goto(
                `https://www.discogs.com/wantlist?${new URLSearchParams({
                    page: pageNumber.toString(),
                    limit: PAGE_PER_PAGE.toString(),
                    user: username,
                    layout: 'sm',
                }).toString()}`,
                { waitUntil: 'domcontentloaded' },
            )

            // An unknown user or a private wantlist has nothing for sale
            if (response?.status() === 404) {
                return { ids: [], pages: 0 }
            }

            if (!response?.ok()) {
                const status = response?.status() ?? '?'
                const { 'cf-mitigated': cfMitigated, 'cf-ray': cfRay = '?' } = response?.headers() ?? {}
                throw new Error(
                    cfMitigated
                        ? `An error ${status} occurred: blocked by Cloudflare (${cfMitigated}, cf-ray ${cfRay}).`
                        : `An error ${status} occurred.`,
                )
            }

            const { total, ids } = await browserPage.evaluate(() => ({
                total: +(document.querySelector('.pagination_total')?.textContent.split(' of ').pop()?.replace(/,/g, '') ?? '0'),
                // The releases for sale are the ones with a link to their listings
                ids: [...document.querySelectorAll<HTMLAnchorElement>('.marketplace_for_sale_count a')].map(
                    x => +(new URL(x.href).pathname.split('/').pop() ?? '0'),
                ),
            }))

            return { ids, pages: Math.ceil(total / PAGE_PER_PAGE) }
        } finally {
            await browserPage.close()
        }
    })
}

/**
 * Gets the IDs of the releases in a user's wantlist, to pass as `releaseIds` to `search`.
 * By default, it reads the public Discogs API (limited to 25 requests per minute without token, 60 with).
 * @param username - Username whose wantlist is read.
 * @param options - Options.
 * @param browserInstance - Optional Patchright browser instance, only used with `onlyForSale`. If provided, you must manage its lifecycle.
 * @returns A promise that resolves to the release IDs.
 */
export default async function getWantlistReleaseIds(
    username: string,
    { token, onlyForSale = false }: WantlistOptions = {},
    browserInstance?: Browser,
): Promise<Array<number>> {
    if (onlyForSale) {
        return withBrowserContext(browserInstance, browserContext => scrapeWantlist(username, browserContext))
    }

    return fetchWantlist(username, token)
}
