import { ECountryCode, ECountryName } from 'enums/iso'

/**
 * One item from discogs
 */
export default interface IItem {
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
    from: {
        /** CountryName */
        countryName: string
        /** IsoCountryName */
        isoCountryName: ECountryName
        /** IsoCountryCode */
        isoCountryCode: ECountryCode
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
}
