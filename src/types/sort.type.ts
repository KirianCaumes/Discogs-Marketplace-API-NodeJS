type SortField = 'listed' | 'condition' | 'artist' | 'title' | 'label' | 'seller' | 'price'
type SortDirection = 'asc' | 'desc'

/**
 * Sorts
 */
export type Sort = `${SortField},${SortDirection}` | ({} & string)
