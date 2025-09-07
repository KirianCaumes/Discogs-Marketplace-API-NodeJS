import type { CountryValues } from 'data/country.data'
import type { CurrencyValues } from 'data/currency.data'

/**
 * Result returned from a Discogs Marketplace search.
 */
export default interface SearchResult {
    /** List of items matching the search query. */
    items: Array<{
        /** Unique identifier for the listing */
        id: number
        /** Full title of the listing */
        title: string
        /** Artists details */
        artists: Array<{
            /** Artist ID */
            id: number | null
            /** Artist name */
            name: string
            /** Artist URL */
            url: string | null
        }>
        /** Release details */
        release: {
            /** Release ID */
            id: number
            /** Release name */
            name: string
            /** Release URL */
            url: string
        }
        /** List of formats */
        formats: Array<string>
        /** labels */
        labels: Array<{
            /** Label ID */
            id: number
            /** Label name */
            name: string
            /** Label URL */
            url: string
        }>
        /** URL to the listing on Discogs */
        url: string
        /** Date the item was listed */
        listedAt: Date | null
        /** Array of catalog numbers */
        catnos: Array<string>
        /** URL to the item's image */
        imageUrl: string | null
        /** Text description of the item */
        description: string | null
        /** Indicates if offers are accepted */
        isAcceptingOffer: boolean
        /** Availability status of the item */
        isAvailable: boolean
        /** Condition details */
        condition: {
            /** Media condition */
            media: {
                /** Full description */
                full: string
                /** Short code */
                short: string
            }
            /** Sleeve condition */
            sleeve: {
                /** Full description */
                full: string | null
                /** Short code */
                short: string | null
            }
        }
        /** Seller information */
        seller: {
            /** Seller's username */
            name: string
            /** Seller's profile URL */
            url: string
            /** Seller rating/score */
            score: string | null
            /** Number of notes/reviews */
            notes: number | null
        }
        /** Pricing details */
        price: {
            /**
             * Base price as a string combining amount and currency.
             * @example '12.34 USD'
             */
            base: `${number} ${CurrencyValues}`
            /**
             * Shipping cost as a string combining amount and currency.
             * @example '5.67 USD'
             */
            shipping: `${number} ${CurrencyValues}` | null
        }
        /** Shipping origin country */
        country: {
            /** Country name */
            name: string
            /**
             * ISO country code
             * @example 'US'
             */
            code: CountryValues
        }
        /** Community stats */
        community: {
            /** Number of users who have this item */
            have: number
            /** Number of users who want this item */
            want: number
        }
    }>
    /** Pagination information */
    page: {
        /** Current page number */
        current: number
        /** Total number of pages */
        total: number
    }
    /** Overall search result metadata */
    result: {
        /** Total number of results found */
        total: number
        /** Number of results per page */
        perPage: number
    }
    /** The generated URL used for the search */
    urlGenerated: string
}
