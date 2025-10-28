/* cspell: disable */
export default interface ShopDetailsResultApi {
    /** Data */
    data?: {
        /** Releases */
        releases?: Array<{
            /** InWantlistCount */
            inWantlistCount?: number
            /** InCollectionCount */
            inCollectionCount?: number
            /** Images */
            images?: {
                /** Edges */
                edges?: Array<{
                    /** Node */
                    node?: {
                        /** Thumbnail */
                        thumbnail?: {
                            /** WebpUrl */
                            webpUrl?: string
                        }
                    }
                }>
            }
            /** Ratings */
            ratings?: {
                /** AverageRating */
                averageRating?: number
            }
            /** DiscogsId */
            discogsId?: number
        } | null>
    }
    /** Errors */
    errors?: Array<{
        /** Message */
        message?: string
        /** Path */
        path?: [string, number]
    }>
    /** Extensions */
    extensions?: {
        /** ValueCompletion */
        valueCompletion?: Array<{
            /** Message */
            message?: string
            /** Path */
            path?: [string, number]
        }>
    }
}
