import type { Condition } from 'types/condition.type'
import type { Currency } from 'types/currency.type'
import type { FormatDescription } from 'types/format-description.type'
import type { Format } from 'types/format.type'
import type { From } from 'types/from.type'
import type { Genre } from 'types/genre.type'
import type { HoursRange } from 'types/hours-range.type'
import type { Lang } from 'types/lang.type'
import type { Limit } from 'types/limit.type'
import type { Search } from 'types/search-type.type'
import type { Sort } from 'types/sort.type'
import type { Style } from 'types/style.type'

/**
 * Search parameters for Discogs Marketplace
 */
export default interface SearchParams {
    /**
     * Type of elements to search.
     * | Name       | Description                |
     * |:---------: |:--------------------------:|
     * | q          | Basic query search         |
     * | master_id  | Search in a master release |
     * | release_id | Search in a release        |
     * | label_id   | Search in a label          |
     * | artist_id  | Search in a artist         |
     * | user       | Search in user wantlist    |
     * @default 'q'
     */
    searchType: Search
    /**
     * Value to search corresponding to the search type
     */
    searchValue?: string | number
    /**
     * Currency
     * @example 'USD'
     */
    currency?: Currency
    /**
     * Genre
     * @example 'Rock'
     */
    genre?: Genre
    /**
     * Styles
     * @example ['Death Metal', 'Heavy Metal']
     */
    style?: Array<Style>
    /**
     * Formats
     * @example ['Vinyl', 'CD']
     */
    format?: Array<Format>
    /**
     * Format descriptions
     * @example ['Limited Edition', 'Numbered']
     */
    formatDescription?: Array<FormatDescription>
    /**
     * Media conditions
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    condition?: Array<Condition>
    /**
     * Year (Do not use it with `years`)
     */
    year?: number
    /**
     * Interval of years (Do not use it with `year`)
     */
    years?: {
        /** Min */
        min: number
        /** Max */
        max: number
    }
    /**
     * Is make an offer only ?
     * @default false
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country
     * @example 'US'
     */
    from?: From
    /**
     * Seller name
     */
    seller?: string
    /**
     * Hours range, only works on wantlist searches.
     * @example '0-24'
     */
    hoursRange?: HoursRange
    /**
     * Sort elements by.
     * @default 'listed,desc'
     */
    sort?: Sort
    /**
     * Limit of elements to search (25 | 50 | 100 | 250).
     * @default 25
     */
    limit?: Limit
    /**
     * Page (Must be < 401 or discogs will return an error 404).
     * @default 1
     */
    page?: number
    /**
     * Lang to use for Discogs.
     * @default 'en'
     */
    lang?: Lang
}
