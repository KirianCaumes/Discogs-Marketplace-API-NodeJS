import { chromium as playwright } from 'playwright-extra'
import playwrightStealth from 'puppeteer-extra-plugin-stealth'
import scrapeLegacy from 'scrapers/legacy.scraper'
import scrapeWantlist from 'scrapers/wantlist.scraper'
import scrape from 'scrapers/modern.scraper'
import type { SearchParams } from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'

export const DEFAULT_LIMIT = 25
export const DEFAULT_PAGE = 1
export const DEFAULT_SORT = 'listed,desc'

/**
 * Performs a search on the Discogs marketplace using the provided parameters.
 * @param searchParams Search parameters
 * @returns A promise that resolves to the search results, including items found, pagination details, and the generated URL.
 */
export default async function search(searchParams: SearchParams): Promise<SearchResult> {
    playwright.use(playwrightStealth())

    const browser = await playwright.launch({
        headless: true,
        chromiumSandbox: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

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

        await browserContext.close()
        await browser.close()

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
    } catch (error) {
        await browserContext.close()
        await browser.close()

        throw error
    }
}
