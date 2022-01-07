import ECountryCode from '@enum/iso/ECountryCode'
import ECountryName from '@enum/iso/ECountryName'

/**
 * One item from discogs
 */
export default interface IItem {
    itemId: number
    title: {
        original: string
        artist: string
        item: string
        formats: string[]
    }
    url: string
    labels: string[]
    catnos: string[]
    imageUrl: string
    description: string
    isAcceptingOffer: boolean
    isAvailable: boolean
    condition: {
        media: {
            full: string
            short: string
        }
        sleeve: {
            full: string
            short: string
        }
    }
    seller: {
        name: string
        url: string
        score: string
        notes: number
    }
    price: {
        base: string
        shipping: string
    }
    from: {
        countryName: string
        isoCountryName: ECountryName
        isoCountryCode: ECountryCode
    }
    community: {
        have: number
        want: number
    }
    release: {
        id: number
        url: string
    }
}
