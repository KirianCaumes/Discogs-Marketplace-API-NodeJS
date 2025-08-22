import scrapeLegacy from 'scrapers/legacy.scraper'
import scrapeWantlist from 'scrapers/wantlist.scraper'
import type SearchParams from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'

/**
 * Performs a search on the Discogs marketplace using the provided parameters.
 * @param params Search parameters
 * @returns A promise that resolves to the search results, including items found, pagination details, and the generated URL.
 */
export default async function search(params: SearchParams): Promise<SearchResult> {
    const searchParams = {
        ...params,
        isMakeAnOfferOnly: params.isMakeAnOfferOnly ?? false,
        sort: params.sort ?? 'listed,desc',
        limit: params.limit ?? 25,
        page: params.page ?? 1,
        lang: params.lang ?? 'en',
    } satisfies SearchParams

    // Determine which scraper to use
    const isScrapingWantlist = searchParams.searchType === 'user' && !searchParams.seller

    const { items, total, urlGenerated } = await (isScrapingWantlist ? scrapeWantlist(searchParams) : scrapeLegacy(searchParams))

    return {
        items,
        result: {
            total,
            perPage: searchParams.limit,
        },
        page: {
            current: searchParams.page,
            total: Math.ceil(total / searchParams.limit),
        },
        urlGenerated,
    }
}
