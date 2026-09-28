import type { CountryValues } from 'data/country.data'
import type { Currency } from 'types/currency.type'

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
            /** Release year */
            year: number | null
            /** Release country */
            country: string | null
            /** Average rating of the release by the community, from 0 to 5 */
            rating: number | null
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
        /** URL to the release's image */
        imageUrl: string | null
        /** URLs of the photos of the item, taken by the seller */
        photos: Array<string>
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
            /** Seller's ID, to use in `sellerIds` */
            id: number
            /** Seller's username */
            name: string
            /** Seller's profile URL */
            url: string
            /** Seller rating/score */
            score: string | null
            /** Number of notes/reviews */
            notes: number | null
            /** Whether the seller is an independent record store */
            isIndependent: boolean
        }
        /** Pricing details */
        price: {
            /**
             * Base price as a string combining amount and currency.
             * @example '12.34 USD'
             */
            base: `${number} ${Currency}`
            /**
             * Shipping cost as a string combining amount and currency.
             * @example '5.67 USD'
             */
            shipping: `${number} ${Currency}` | null
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
    /** Total number of results found */
    total: number
    /** Cursor of the next page, to pass as `after`, or null on the last page */
    nextCursor: string | null
    /** URL of the same search on Discogs */
    urlGenerated: string
}
