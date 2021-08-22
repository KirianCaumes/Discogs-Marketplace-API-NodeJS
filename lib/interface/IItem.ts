/**
 * @interface IItem One item from discogs
 */
export default interface IItem {
    title: {
        original: string | null | undefined,
        artist: string | null | undefined,
        item: string | null | undefined,
    },
    url: string | null | undefined,
    labels: (string | null)[] | undefined,
    catnos: (string | null)[] | undefined,
    imageUrl: string | null | undefined,
    description: string | null | undefined,
    isAcceptingOffer: boolean | null | undefined,
    isAvailable: boolean | null | undefined,
    condition: {
        media: {
            full: string | null | undefined,
            short: string | null | undefined
        },
        sleeve: {
            full: string | null | undefined,
            short: string | null | undefined
        }
    },
    seller: {
        name: string | null | undefined,
        score: string | null | undefined,
        notes: string | null | undefined
    },
    price: {
        base: string | null | undefined,
        shipping: string | null | undefined,
    },
    from: {
        countryName: string | null | undefined,
        isoCountryName: string | null | undefined,
        isoCode: string | null | undefined,
    },
    community: {
        have: number | null | undefined,
        want: number | null | undefined
    },
    releaseUrl: string | null | undefined
}