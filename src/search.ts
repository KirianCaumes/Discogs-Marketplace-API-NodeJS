import withBrowserContext from 'scrapers/browser-context'
import scrapeMarketplace from 'scrapers/marketplace.scraper'
import type { SearchParams } from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'
import type { BrowserContext } from 'patchright'

/** Release IDs a single search can filter on at most */
const MAX_RELEASE_IDS = 2000

/**
 * Performs a search on the Discogs marketplace using the provided parameters.
 * @param searchParams - The search parameters, including query, pagination, and filters.
 * @param browserContext - Optional Patchright browser context, which keeps the clearance of Cloudflare from one search to another.
 *   If provided, you must manage its lifecycle.
 * @returns A promise that resolves to the search results, including items, total, next cursor and the generated URL.
 */
export default async function search(searchParams: SearchParams, browserContext?: BrowserContext): Promise<SearchResult> {
    if ((searchParams.releaseIds?.length ?? 0) > MAX_RELEASE_IDS) {
        throw new Error(`At most ${MAX_RELEASE_IDS} release IDs are supported.`)
    }

    return withBrowserContext(browserContext, x => scrapeMarketplace(searchParams, x))
}
