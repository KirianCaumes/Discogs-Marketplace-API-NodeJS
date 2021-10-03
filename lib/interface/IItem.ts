/**
 * @interface IItem One item from discogs
 */
export default interface IItem {
    itemId: number
    title: {
        original: string
        artist: string
        item: string
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
        score: string
        notes: string
    }
    price: {
        base: string
        shipping: string
    }
    from: {
        countryName: string
        isoCountryName: string
        isoCode: string
    }
    community: {
        have: number
        want: number
    }
    releaseUrl: string
    releaseId: number
}