/* cspell: disable */
export default interface ShopResultApi {
    /** Items */
    items?: Array<{
        /** ItemId */
        itemId?: number
        /** AllowsOffers */
        allowsOffers?: boolean
        /** Comments */
        comments?: string
        /** ImageUrl */
        imageUrl?: string
        /** InCart */
        inCart?: boolean
        /** ListedDate */
        listedDate?: string
        /** MediaCondition */
        mediaCondition?: string
        /** PreviousPrice */
        previousPrice?: string
        /** Price */
        price?: {
            /** Amount */
            amount?: number
            /** AmountUsd */
            amountUsd?: number
            /** CurrencyCode */
            currencyCode?: string
            /** BuyerItemPrice */
            buyerItemPrice?: string
            /** BuyerCurrencyCode */
            buyerCurrencyCode?: string
        }
        /** Release */
        release?: {
            /** ReleaseId */
            releaseId?: number
            /** Artists */
            artists?: Array<{
                /** ArtistId */
                artistId?: number
                /** Name */
                name?: string
            }>
            /** Country */
            country?: string
            /** FormatNames */
            formatNames?: Array<string>
            /** Genres */
            genres?: Array<{
                /** GenreId */
                genreId?: number
                /** Name */
                name?: string
            }>
            /** Labels */
            labels?: Array<{
                /** LabelId */
                labelId?: number
                /** Name */
                name?: string
            }>
            /** MajorFormat */
            majorFormat?: string
            /** Rating */
            rating?: number
            /** Title */
            title?: string
            /** Year */
            year?: number
        }
        /** Seller */
        seller?: {
            /** Uid */
            uid?: number
            /** Name */
            name?: string
            /** Rating */
            rating?: number
            /** RatingCount */
            ratingCount?: number
            /** ShipsFrom */
            shipsFrom?: string
            /** MinBuyerRating */
            minBuyerRating?: number
            /** IndependentSeller */
            independentSeller?: boolean
        }
        /** Shipping */
        shipping?: {
            /** ShippingPrice */
            shippingPrice?: number
            /** BuyerShippingPrice */
            buyerShippingPrice?: number
            /** FreeShippingMin */
            freeShippingMin?: number
        }
        /** SleeveCondition */
        sleeveCondition?: string
    }>
    /** TotalCount */
    totalCount?: number
    /** CompleteLookup */
    completeLookup?: {
        /** Artists */
        artists?: string
        /** Sellers */
        sellers?: string
        /** Releases */
        releases?: Record<string, string>
    }
}
