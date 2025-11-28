import { chromium as playwright } from 'playwright-extra'
import playwrightStealth from 'puppeteer-extra-plugin-stealth'
import scrapeLegacy from 'scrapers/legacy.scraper'
import scrapeWantlist from 'scrapers/wantlist.scraper'
import scrape from 'scrapers/modern.scraper'
import type { SearchParams } from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'
import type { Browser } from 'playwright-chromium'

export const DEFAULT_LIMIT = 25
export const DEFAULT_PAGE = 1
export const DEFAULT_SORT = 'listed,desc'

/**
 * Performs a search on the Discogs marketplace using the provided parameters.
 * @param searchParams - The search parameters, including API type, query, pagination, and filters.
 * @param browserInstance - Optional Playwright browser instance. If provided, you must manage its lifecycle.
 * @returns A promise that resolves to the search results, including items, pagination info, and the generated URL.
 */
export default async function search(searchParams: SearchParams, browserInstance?: Browser): Promise<SearchResult> {
    const browser =
        browserInstance ??
        (await (() => {
            playwright.use(playwrightStealth())
            return playwright.launch({
                headless: true,
                chromiumSandbox: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            })
        })())

    const browserContext = await browser.newContext({
        javaScriptEnabled: false,
        extraHTTPHeaders:
            searchParams.api === 'legacy' && !(searchParams.seller && searchParams.user)
                ? {
                      'X-PJAX': 'true',
                  }
                : undefined,
    })

    try {
        const { items, total, urlGenerated } = await (() => {
            if (searchParams.api === 'v2' && searchParams.wantlist) {
                return scrapeWantlist(searchParams, browserContext)
            }
            if (searchParams.api === 'v2') {
                return scrape(searchParams, browserContext)
            }
            return scrapeLegacy(searchParams, browserContext)
        })()

        return {
            items,
            result: {
                total,
                perPage: searchParams.limit ?? DEFAULT_LIMIT,
            },
            page: {
                current: searchParams.page ?? DEFAULT_PAGE,
                total: Math.ceil(total / (searchParams.limit ?? DEFAULT_LIMIT)),
            },
            urlGenerated,
        }
    } finally {
        await browserContext.close()

        if (!browserInstance) {
            await browser.close()
        }
    }
}
