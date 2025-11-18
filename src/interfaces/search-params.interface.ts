import type { Condition } from 'types/condition.type'
import type { Currency } from 'types/currency.type'
import type { FormatDescription } from 'types/format-description.type'
import type { Format } from 'types/format.type'
import type { From } from 'types/from.type'
import type { Genre } from 'types/genre.type'
import type { Lang } from 'types/lang.type'
import type { Limit } from 'types/limit.type'
import type { Api } from 'types/api.type'
import type { Sort } from 'types/sort.type'
import type { Style } from 'types/style.type'

interface SearchParamsBase {
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
     * Range of years.
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
     * Page number of results.
     * Must be less than 401 to avoid Discogs 404 errors.
     * @default 1
     */
    page?: number
}

interface SearchParamsLegacyBase extends SearchParamsBase {
    /**
     * Api version to use.
     *
     * Choose `legacy` for the legacy API that scrapes HTML page. Required if you want to search on master or label.
     */
    api: Extract<Api, 'legacy'>
    /**
     * Query string to filter.
     */
    query?: string
    /**
     * Currency code for price filtering.
     * @example 'USD'
     */
    currency?: Currency
    /**
     * Media conditions.
     * @example 'Mint (M)'
     */
    condition?: Condition
    /**
     * Genre filter.
     * @example 'Rock'
     */
    genre?: Genre
    /**
     * List of styles.
     * @example ['Death Metal', 'Heavy Metal']
     */
    styles?: Array<Style>
    /**
     * Expedition country filter.
     * @example 'France'
     */
    from?: From
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
     * Seller's name.
     */
    seller?: string
    /**
     * User's name.
     */
    user?: string
    /**
     * Language code for Discogs interface.
     * @default 'en'
     */
    lang?: Lang
}

/**
 * Parameters used to search listings on the Discogs Marketplace via new old HTML Scraping.
 */
export type SearchParamsLegacy = (
    | {
          /** Master release ID. */
          masterId?: number
          labelId?: never // eslint-disable-line jsdoc/require-jsdoc
          releaseId?: never // eslint-disable-line jsdoc/require-jsdoc
          artistId?: never // eslint-disable-line jsdoc/require-jsdoc
      }
    | {
          masterId?: never // eslint-disable-line jsdoc/require-jsdoc
          /** Label ID. */
          labelId?: number
          releaseId?: never // eslint-disable-line jsdoc/require-jsdoc
          artistId?: never // eslint-disable-line jsdoc/require-jsdoc
      }
    | {
          masterId?: never // eslint-disable-line jsdoc/require-jsdoc
          labelId?: never // eslint-disable-line jsdoc/require-jsdoc
          /** Release ID. */
          releaseId?: number
          artistId?: never // eslint-disable-line jsdoc/require-jsdoc
      }
    | {
          masterId?: never // eslint-disable-line jsdoc/require-jsdoc
          labelId?: never // eslint-disable-line jsdoc/require-jsdoc
          releaseId?: never // eslint-disable-line jsdoc/require-jsdoc
          /** Artist ID. */
          artistId?: number
      }
) &
    SearchParamsLegacyBase

interface SearchParamsModernBase extends SearchParamsBase {
    /**
     * Api version to use.
     *
     * Choose `v2` for the modern API that uses JSON (used in the `https://www.discogs.com/shop/mywants` page).
     */
    api: Extract<Api, 'v2'>
    /**
     * List of currency codes for price filtering.
     * @example ['USD']
     */
    currencies?: Array<Currency>
    /**
     * List of media conditions.
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    conditions?: Array<Condition>
    /**
     * List of genres.
     * @example ['Rock']
     */
    genres?: Array<Genre>
    /**
     * Expedition country filter.
     * @example 'France'
     */
    from?: Array<From>
    /**
     * Sort order for the results.
     * @default 'listed,desc'
     */
    sort?: Exclude<Sort, 'label,asc' | 'label,desc'>
    /**
     * Number of results to return per page.
     * It must be less than or equal to 250.
     * @default 25
     */
    limit?: number
    /**
     * List of artist IDs.
     */
    artistIds?: Array<number>
    /**
     * List of seller IDs.
     *
     * You can easily find someone's ID via the Discogs API: https://api.discogs.com/users/{seller_name}
     */
    sellerIds?: Array<number>
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
     * Minimum seller rating, from 0 to 100.
     * @default 0
     */
    sellerRatingMin?: number
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
     * Minimum seller rating count.
     * @default 0
     */
    sellerRatingCountMin?: number
}

/**
 * Parameters used to search listings on the Discogs Marketplace via new new modern API.
 */
export type SearchParamsModern = (
    | {
          /** User's wantlist name. */
          wantlist?: string
          releaseIds?: never // eslint-disable-line jsdoc/require-jsdoc
      }
    | {
          wantlist?: never // eslint-disable-line jsdoc/require-jsdoc
          /** List of release IDs. */
          releaseIds?: Array<number>
      }
) &
    SearchParamsModernBase

export type SearchParams = SearchParamsLegacy | SearchParamsModern
