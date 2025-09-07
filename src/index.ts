import search from 'search'
import type { SearchParams } from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'

/**
 * Discogs Marketplace API, tools for interacting with the Discogs Marketplace.
 * @see {@link https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS GitHub Repository}
 */
export const DiscogsMarketplace = { search }

export type { SearchParams, SearchResult }
