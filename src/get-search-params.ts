/* eslint-disable no-restricted-syntax */

import type SearchParams from 'interfaces/search-params.interface'

/**
 * Safely parse an integer from a string
 * @param value String to parse
 * @returns Parsed integer or undefined if parsing fails
 */
const safeParseInt = (value: string | null): number | undefined => {
    const parsed = parseInt(value ?? '', 10)
    return isNaN(parsed) ? undefined : parsed
}

/**
 * Get search parameters from a Discogs Marketplace URL
 * @param url Discogs Marketplace URL
 * @returns Search parameters
 * @example
 * const searchParams = getSearchParamsFromUrl('https://www.discogs.com/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock')
 * // { searchType: 'artist_id', searchValue: '244819', genre: 'Rock', sort: 'listed,desc', limit: 250, page: 2 }
 */
export default function getSearchParamsFromUrl(url: string): SearchParams {
    const { searchParams: urlSearchParams, pathname, host } = new URL(url)

    if (!host.includes('discogs.com')) {
        throw new Error(`Invalid host: ${host}. Expected 'www.discogs.com' or 'discogs.com'.`)
    }

    const searchParams: SearchParams = {
        searchType: 'q', // Default search type
    }

    // Retrieve the search type and value
    const searchType = (['q', 'master_id', 'release_id', 'label_id', 'artist_id', 'user'] as const).find(type => urlSearchParams.has(type))
    if (searchType) {
        searchParams.searchType = searchType
        const searchValue = urlSearchParams.get(searchType)
        if (searchValue) {
            searchParams.searchValue = searchValue
        }
    }

    // Retrieve basic search values
    for (const key of ['currency', 'genre', 'ships_from', 'seller', 'sort'] as const) {
        const value = urlSearchParams.get(key)
        if (value) {
            switch (key) {
                case 'ships_from':
                    searchParams.from = value
                    break
                default:
                    searchParams[key] = value
                    break
            }
        }
    }

    // Retrieve number search values
    for (const key of ['limit', 'page'] as const) {
        const value = safeParseInt(urlSearchParams.get(key))
        if (value) {
            switch (key) {
                case 'limit':
                    searchParams.limit = value as SearchParams['limit']
                    break
                default:
                    searchParams[key] = value
                    break
            }
        }
    }

    // Retrieve array search values
    for (const key of ['style', 'format', 'format_desc', 'condition'] as const) {
        const values = urlSearchParams.getAll(key)
        if (values.length) {
            switch (key) {
                case 'format_desc':
                    searchParams.formatDescription = values
                    break
                default:
                    searchParams[key] = values
                    break
            }
        }
    }

    // Check if search is on offers only
    if (urlSearchParams.get('offers') === '1') {
        searchParams.isMakeAnOfferOnly = true
    }

    // Handle year and years
    const year = safeParseInt(urlSearchParams.get('year'))
    const year1 = safeParseInt(urlSearchParams.get('year1'))
    const year2 = safeParseInt(urlSearchParams.get('year2'))

    if (year) {
        searchParams.year = year
    } else if (year1 && year2) {
        searchParams.years = { min: year1, max: year2 }
    }

    // Retrieve the language from the URL path
    const pathSegments = pathname.split('/').filter(x => x)
    if (/^[a-z]{2}$/i.test(pathSegments[0] ?? '')) {
        searchParams.lang = pathSegments[0]?.toLowerCase()
    }

    // Handle specific case for release ID in the URL path
    const releaseIdMatch = /\/sell\/release\/(\d+)/.exec(url)
    if (releaseIdMatch?.[1]) {
        searchParams.searchType = 'release_id'
        searchParams.searchValue = releaseIdMatch[1]
    }

    // Handle specific case for seller profile in the URL path
    const sellerProfileMatch = /\/seller\/([^/]+)\/profile/.exec(url)
    if (sellerProfileMatch?.[1]) {
        searchParams.seller = sellerProfileMatch[1]
    }

    // Handle specific case for seller name on wantlist in the URL path
    const sellerMyWantsMatch = /\/seller\/([^/]+)\/mywants/.exec(url)
    if (sellerMyWantsMatch?.[1]) {
        searchParams.searchType = 'user'
        searchParams.searchValue = urlSearchParams.get('user') ?? ''
        searchParams.seller = sellerMyWantsMatch[1]
    }

    return searchParams
}
