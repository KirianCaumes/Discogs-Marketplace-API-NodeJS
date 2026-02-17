import scrape from 'scrapers/modern.scraper'
import type SearchResult from 'interfaces/search-result.interface'
import type { SearchParamsModern } from 'interfaces/search-params.interface'
import type { BrowserContext } from 'playwright-chromium'

const PER_PAGE = 250

/**
 * Parses the page and returns the items found.
 * @param searchParams Search parameters
 * @param browserContext Playwright browser context
 * @returns Items found and total
 */
export default async function scrapeWantlist(
    searchParams: SearchParamsModern,
    browserContext: BrowserContext,
): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    /**
     * Fetches the content of a specific page number in the wantlist.
     * @param pageNumber Page number to fetch
     * @returns Links and total items found
     */
    const getPageContent = async (pageNumber: number) => {
        const url = `https://www.discogs.com/wantlist?${new URLSearchParams({
            page: pageNumber.toString(),
            limit: PER_PAGE.toString(),
            user: searchParams.wantlist ?? '',
            layout: 'sm',
        }).toString()}`

        const browserPage = await browserContext.newPage()

        await browserPage.setExtraHTTPHeaders({
            'User-Agent': 'Discogs',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.7,fr-FR;q=0.8',
            Referer: url,
        })

        await browserPage.route('**/*', route => (route.request().resourceType() === 'document' ? route.continue() : route.abort()))

        const response = await browserPage.goto(url, { waitUntil: 'domcontentloaded' })

        const [total, ids] = await Promise.all([
            browserPage.evaluate(
                () => +(document.querySelector('.pagination_total')?.textContent.split(' of ').pop()?.replace(',', '') ?? '0'),
            ),
            browserPage.evaluate(() => {
                /** Extract the links to the items in the wantlist, if there's no link it's not for sale */
                const links = [...document.querySelectorAll<HTMLLinkElement>('.marketplace_for_sale_count a')]
                return links.map(x => +(new URL(`https://discogs.com${x.href}`).pathname.split('/').pop() ?? '0'))
            }),
        ])

        await browserPage.close()

        return {
            ids,
            total,
            status: response?.status() ?? 500,
        }
    }

    /** Fetch the first page of user wantlist */
    const firstPageResponse = await getPageContent(1)

    if (firstPageResponse.status >= 400 && firstPageResponse.status !== 404) {
        throw new Error(`An error ${firstPageResponse.status} occurred.`)
    }

    const wants = await Promise.all(
        new Array(Math.ceil(firstPageResponse.total / PER_PAGE))
            .fill({})
            .map(async (_, i) => (i === 0 ? firstPageResponse : await getPageContent(i + 1))),
    )

    const wantlistIds = wants.flatMap(x => x.ids)

    // If there's nothing for sale
    if (wantlistIds.length === 0) {
        return scrape({ ...searchParams, releaseIds: [0], wantlist: undefined }, browserContext)
    }

    return scrape({ ...searchParams, releaseIds: wantlistIds, wantlist: undefined }, browserContext)
}
