/**
 * Response of the `MarketplaceSearch` GraphQL query
 */
export default interface MarketplaceSearchResultApi {
    /** Data */
    data?: {
        /** MarketplaceSearch */
        marketplaceSearch?: {
            /** Edges */
            edges?: Array<{
                /** Node */
                node?: {
                    /** Id */
                    id?: string
                    /** OfferOk */
                    offerOk?: boolean
                    /** MediaCondition */
                    mediaCondition?: string | null
                    /** SleeveCondition */
                    sleeveCondition?: string | null
                    /** PublicNotes */
                    publicNotes?: string | null
                    /** ListedDate */
                    listedDate?: string | null
                    /** ItemPhotos */
                    itemPhotos?: Array<{
                        /** Position */
                        position?: number
                        /** Url */
                        url?: string
                    }>
                    /** Price */
                    price?: {
                        /** Amount */
                        amount?: number
                        /** Currency */
                        currency?: string
                    }
                    /** Shipping */
                    shipping?: {
                        /** Price */
                        price?: {
                            /** Amount */
                            amount?: number
                            /** Currency */
                            currency?: string
                        } | null
                    } | null
                    /** Availability */
                    availability?: {
                        /** IsAvailable */
                        isAvailable?: boolean
                    }
                    /** Seller */
                    seller?: {
                        /** Username */
                        username?: string
                        /** DiscogsId */
                        discogsId?: number
                    }
                    /** SellerInfo */
                    sellerInfo?: {
                        /** Rating */
                        rating?: number | null
                        /** RatingCount */
                        ratingCount?: number | null
                        /** IndependentSeller */
                        independentSeller?: boolean
                        /** ShipsFrom */
                        shipsFrom?: string | null
                    }
                    /** Release */
                    release?: {
                        /** Title */
                        title?: string
                        /** DiscogsId */
                        discogsId?: number
                        /** Released, as a year or a date with zeros for the unknown parts */
                        released?: string | null
                        /** Country */
                        country?: string | null
                        /** Labels */
                        labels?: Array<{
                            /** CatalogNumber */
                            catalogNumber?: string | null
                            /** LabelRole */
                            labelRole?: string
                            /** Label */
                            label?: {
                                /** DiscogsId, missing on an unlinked label */
                                discogsId?: number
                                /** Name */
                                name?: string
                            }
                        }>
                        /** FormatSummary */
                        formatSummary?: {
                            /** PrimaryFormat */
                            primaryFormat?: string | null
                            /** RecordingTypes */
                            recordingTypes?: Array<string> | null
                            /** Description */
                            description?: string | Array<string> | null
                        } | null
                        /** PrimaryArtists */
                        primaryArtists?: Array<{
                            /** DisplayName */
                            displayName?: string
                            /** Artist */
                            artist?: {
                                /** DiscogsId */
                                discogsId?: number
                            } | null
                        }>
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
                                    } | null
                                }
                            }>
                        } | null
                    }
                }
            }>
            /** PageInfo */
            pageInfo?: {
                /** HasNextPage */
                hasNextPage?: boolean
                /** EndCursor */
                endCursor?: string | null
            }
            /** TotalCount */
            totalCount?: number
        }
    }
    /** Errors */
    errors?: Array<{
        /** Message */
        message?: string
    }>
}
