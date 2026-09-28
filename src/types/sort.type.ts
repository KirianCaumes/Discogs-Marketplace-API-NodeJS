type SortField =
    | 'listed'
    | 'condition'
    | 'sleeveCondition'
    | 'artist'
    | 'title'
    | 'year'
    | 'releaseCountry'
    | 'seller'
    | 'sellerRating'
    | 'sellerRatingCount'
    | 'shipsFrom'
    | 'price'
type SortDirection = 'asc' | 'desc'

/**
 * Sorts
 */
export type Sort = `${SortField},${SortDirection}` | ({} & string)
