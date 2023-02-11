import {
    LimitType,
    GenreType,
    CurrencyType,
    FromType,
    StyleType,
    FormatType,
    ConditionType,
    SortType,
    LangType,
    FormatDescriptionType,
    SearchTypeType,
} from 'types/unions'

/**
 * Element that can be provided by user
 */
type InputCommonType = {
    /**
     * Type of elements to search.
     * Default to `q`.
     * | Name       | Description                |
     * |:---------: |:--------------------------:|
     * | q          | Basic query search         |
     * | master_id  | Search in a master release |
     * | release_id | Search in a release        |
     * | label_id   | Search in a label          |
     * | artist_id  | Search in a artist         |
     * | user       | Search in user wantlist    |
     */
    searchType: SearchTypeType
    /**
     * Value to search corresponding to searchType
     */
    searchValue: string | number | undefined
    /**
     * Currency
     */
    currency?: CurrencyType
    /**
     * Genre
     */
    genre?: GenreType
    /**
     * Styles
     */
    style?: StyleType[]
    /**
     * Formats
     */
    format?: FormatType[]
    /**
     * Format descriptions
     */
    formatDescription?: FormatDescriptionType[]
    /**
     * Media conditions
     */
    condition?: ConditionType[]
    /**
     * Year (Do not use it with `years`)
     */
    year?: number
    /**
     * Interval of years (Do not use it with `year`)
     */
    years?: {
        /** Min */
        min: number
        /** Max */
        max: number
    }
    /**
     * Is audio sample ?
     */
    isAudioSample?: boolean
    /**
     * Is make an offer only ?
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country
     */
    from?: FromType
    /**
     * Seller name
     */
    seller?: string
    /**
     * Sort elements by
     */
    sort?: SortType
    /**
     * Limit of elements to search (25 | 50 | 100 | 250)
     */
    limit?: LimitType
    /**
     * Page (Must be < 401 or discogs will return an error 404).
     * Default to `25`.
     */
    page?: number
    /**
     * Lang to use for Discogs.
     * Default to `en`.
     */
    lang?: LangType
}

export default InputCommonType
