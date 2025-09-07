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
    const { items, total, urlGenerated } = await (() => {
        if (searchParams.api === 'v2' && searchParams.wantlist) {
            return scrapeWantlist(searchParams)
        }
        if (searchParams.api === 'v2') {
            return scrape(searchParams)
        }
        return scrapeLegacy(searchParams)
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
}
