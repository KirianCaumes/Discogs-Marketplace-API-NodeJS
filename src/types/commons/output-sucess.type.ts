import { SearchTypeType } from 'types/unions'

/**
 * Result provided to user
 */
type OutputSuccessType = {
    /** Items */
    items: {
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
            formats: string[]
        }
        /** Url */
        url: string
        /** Labels */
        labels: string[]
        /** Catnos */
        catnos: string[]
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
            /** Base */
            base: string
            /** Shipping */
            shipping: string
        }
        /** From */
        country: {
            /** Name */
            name: string
            /** Iso code */
            code: string
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
    }[]
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
    /** Search */
    search: {
        /** Value */
        value: string | number
        /** Type */
        type: SearchTypeType
    }
    /** UrlGenerated */
    urlGenerated: string
}

export default OutputSuccessType
