import type { Condition } from 'types/condition.type'
import type { Currency } from 'types/currency.type'
import type { FormatDescription } from 'types/format-description.type'
import type { Format } from 'types/format.type'
import type { From } from 'types/from.type'
import type { Genre } from 'types/genre.type'
import type { Lang } from 'types/lang.type'
import type { Limit } from 'types/limit.type'
import type { Search } from 'types/search-type.type'
import type { Sort } from 'types/sort.type'
import type { Style } from 'types/style.type'

/**
 * Parameters used to search listings on the Discogs Marketplace.
 */
export default interface SearchParams {
    /**
     * The type of element to search.
     * | Value       | Description                    |
     * |-------------|--------------------------------|
     * | `q`         | Basic query search             |
     * | `master_id` | Search within a master release |
     * | `release_id`| Search within a release        |
     * | `label_id`  | Search within a label          |
     * | `artist_id` | Search by artist               |
     * | `user`      | Search a user's wantlist       |
     * @default 'q'
     */
    searchType: Search
    /**
     * The search value corresponding to the selected `searchType`.
     */
    searchValue?: string | number
    /**
     * Currency code for price filtering.
     * @example 'USD'
     */
    currency?: Currency
    /**
     * Genre filter.
     * @example 'Rock'
     */
    genre?: Genre
    /**
     * List of styles.
     * @example ['Death Metal', 'Heavy Metal']
     */
    style?: Array<Style>
    /**
     * List of formats.
     * @example ['Vinyl', 'CD']
     */
    format?: Array<Format>
    /**
     * List of format descriptions.
     * @example ['Limited Edition', 'Numbered']
     */
    formatDescription?: Array<FormatDescription>
    /**
     * List of media conditions.
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    condition?: Array<Condition>
    /**
     * Release year.
     * Do not use together with `years`.
     */
    year?: number
    /**
     * Range of years.
     * Do not use together with `year`.
     */
    years?: {
        /** Minimum year */
        min: number
        /** Maximum year */
        max: number
    }
    /**
     * If true, only listings that accept offers are returned.
     * @default false
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country filter (2-letter country code).
     * @example 'US'
     */
    from?: From
    /**
     * Seller's username filter.
     */
    seller?: string
    /**
     * Sort order for the results.
     * @default 'listed,desc'
     */
    sort?: Sort
    /**
     * Number of results to return per page.
     * Allowed values: 25, 50, 100, 250.
     * @default 25
     */
    limit?: Limit
    /**
     * Page number of results.
     * Must be less than 401 to avoid Discogs 404 errors.
     * @default 1
     */
    page?: number
    /**
     * Language code for Discogs interface.
     * @default 'en'
     */
    lang?: Lang
}

export type SearchParamsDefaulted = SearchParams & {
    searchType: NonNullable<SearchParams['searchType']> // eslint-disable-line jsdoc/require-jsdoc
    isMakeAnOfferOnly: NonNullable<SearchParams['isMakeAnOfferOnly']> // eslint-disable-line jsdoc/require-jsdoc
    sort: NonNullable<SearchParams['sort']> // eslint-disable-line jsdoc/require-jsdoc
    limit: NonNullable<SearchParams['limit']> // eslint-disable-line jsdoc/require-jsdoc
    page: NonNullable<SearchParams['page']> // eslint-disable-line jsdoc/require-jsdoc
    lang: NonNullable<SearchParams['lang']> // eslint-disable-line jsdoc/require-jsdoc
}
