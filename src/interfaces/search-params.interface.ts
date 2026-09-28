import type { Condition, SleeveCondition } from 'types/condition.type'
import type { Currency } from 'types/currency.type'
import type { FormatDescription } from 'types/format-description.type'
import type { Format } from 'types/format.type'
import type { From } from 'types/from.type'
import type { Genre } from 'types/genre.type'
import type { Sort } from 'types/sort.type'
import type { Style } from 'types/style.type'

/**
 * Parameters used to search listings on the Discogs Marketplace.
 */
export interface SearchParams {
    /**
     * Query string to filter.
     * @example 'nirvana nevermind'
     */
    query?: string
    /**
     * List of artist IDs.
     */
    artistIds?: Array<number>
    /**
     * List of label IDs.
     */
    labelIds?: Array<number>
    /**
     * List of master release IDs.
     */
    masterIds?: Array<number>
    /**
     * List of release IDs, at most 2000. As for every other filter, an empty list means no filter.
     * To search a user's wantlist, get its release IDs with `getWantlistReleaseIds`.
     */
    releaseIds?: Array<number>
    /**
     * List of seller IDs.
     *
     * You can easily find someone's ID via the Discogs API: https://api.discogs.com/users/{seller_name}
     */
    sellerIds?: Array<number>
    /**
     * List of genres.
     * @example ['Rock']
     */
    genres?: Array<Genre>
    /**
     * List of styles.
     * @example ['Death Metal', 'Heavy Metal']
     */
    styles?: Array<Style>
    /**
     * List of formats.
     * @example ['Vinyl', 'CD']
     */
    formats?: Array<Format>
    /**
     * List of format descriptions.
     * @example ['Limited Edition', 'Numbered']
     */
    formatDescriptions?: Array<FormatDescription>
    /**
     * List of media conditions.
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    mediaConditions?: Array<Condition>
    /**
     * List of sleeve conditions.
     * @example ['Mint (M)', 'Generic']
     */
    sleeveConditions?: Array<SleeveCondition>
    /**
     * List of expedition countries.
     * @example ['FR']
     */
    from?: Array<From>
    /**
     * List of currency codes for price filtering.
     * @example ['USD']
     */
    currencies?: Array<Currency>
    /**
     * Price range filter.
     */
    priceRange?: {
        /** Minimum price */
        min: number
        /** Maximum price */
        max: number
    }
    /**
     * Range of years.
     */
    years?: {
        /** Minimum year */
        min: number
        /** Maximum year */
        max: number
    }
    /**
     * Minimum seller rating, from 0 to 100. Unrated sellers are still returned.
     * @default 0
     */
    sellerRatingMin?: number
    /**
     * Minimum seller rating count.
     * @default 0
     */
    sellerRatingCountMin?: number
    /**
     * If true, only listings that accept offers are returned.
     * @default false
     */
    isMakeAnOfferOnly?: boolean
    /**
     * If true, only listings with photos of the item are returned.
     * @default false
     */
    hasItemPhotos?: boolean
    /**
     * Hide generic sleeves.
     * @default false
     */
    hideGenericSleeves?: boolean
    /**
     * Hide sleeveless media.
     * @default false
     */
    hideSleevelessMedia?: boolean
    /**
     * Show unavailable items.
     * @default true
     */
    showUnavailable?: boolean
    /**
     * Sort order for the results.
     * @default 'listed,desc'
     */
    sort?: Sort
    /**
     * Number of results to return per page.
     * It must be less than or equal to 250.
     * @default 25
     */
    limit?: number
    /**
     * Cursor of the page to get, as returned by `nextCursor` in the previous result.
     */
    after?: string
}
