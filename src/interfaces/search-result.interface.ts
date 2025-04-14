import type { CountryValues } from 'data/country.data'
import type { CurrencyValues } from 'data/currency.data'

/**
 * Search result from Discogs Marketplace
 */
export default interface SearchResult {
    /** Items */
    items: Array<{
        /** Id */
        id: number
        /** Title */
        title: {
            /** Original */
            original: string
            /** Artist */
            artist: string
            /** Item */
            item: string
            /** Formats */
            formats: Array<string>
        }
        /** Url */
        url: string
        /** Labels */
        labels: Array<string>
        /** Catnos */
        catnos: Array<string>
        /** ImageUrl */
        imageUrl: string
        /** Description */
        description: string
        /** IsAcceptingOffer */
        isAcceptingOffer: boolean
        /** IsAvailable */
        isAvailable: boolean
        /** Condition */
        condition: {
            /** Media */
            media: {
                /** Full */
                full: string
                /** Short */
                short: string
            }
            /** Sleeve */
            sleeve: {
                /** Full */
                full: string
                /** Short */
                short: string
            }
        }
        /** Seller */
        seller: {
            /** Name */
            name: string
            /** Url */
            url: string
            /** Score */
            score: string
            /** Notes */
            notes: number
        }
        /** Price */
        price: {
            /**
             * Base
             * @example '12.34 USD'
             */
            base: `${number} ${CurrencyValues}` | ''
            /**
             * Shipping
             * @example '5.67 USD'
             */
            shipping: `${number} ${CurrencyValues}` | ''
        }
        /** From */
        country: {
            /** Name */
            name: string
            /**
             * Iso code
             * @example 'US'
             */
            code: CountryValues
        }
        /** Community */
        community: {
            /** Have */
            have: number
            /** Want */
            want: number
        }
        /** Release */
        release: {
            /** Id */
            id: number
            /** Url */
            url: string
        }
    }>
    /** Page */
    page: {
        /** Current */
        current: number
        /** Total */
        total: number
    }
    /** Result */
    result: {
        /** Total */
        total: number
        /** PerPage */
        perPage: number
    }
    /** UrlGenerated */
    urlGenerated: string
}
