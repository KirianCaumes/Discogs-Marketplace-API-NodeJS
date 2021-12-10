import EFrom from '@enum/EFrom'
import EType from '@enum/EType'
import ECurrency from '@enum/ECurrency'
import EGenre from '@enum/EGenre'
import EStyle from '@enum/EStyle'
import EMediaCondition from '@enum/EMediaCondition'
import ESort from '@enum/ESort'
import TLimit from '@type/TLimit'
import IYears from '@interface/IYears'
import EFormat from '@enum/EFormat'
import EFormatDescription from '@enum/EFormatDescription'
import ELang from '@enum/ELang'

/**
 * @interface IInput Element that can be provided by user
 */
export default interface IInput {
    /**
     * Type of elements to search
     */
    searchType: EType
    /**
     * Value to search corresponding to searchType
     */
    searchValue: string | number | undefined
    /**
     * Currency
     */
    currency?: ECurrency
    /**
     * Genre
     */
    genre?: EGenre
    /**
     * Styles
     */
    style?: EStyle[]
    /**
     * Formats
     */
    format?: EFormat[]
    /**
     * Format descriptions
     */
    formatDescription?: EFormatDescription[]
    /**
     * Media conditions
     */
    mediaCondition?: EMediaCondition[]
    /**
     * Year (Do not use it with years)
     */
    year?: number
    /**
     * Interval of years (Do not use it with year)
     */
    years?: IYears
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
    from?: EFrom
    /**
     * Seller name
     */
    seller?: string
    /**
     * Sort elements by
     */
    sort?: ESort
    /**
     * Limit of elements to search (25 | 50 | 100 | 250)
     */
    limit?: TLimit
    /**
     * Page (Must be < 401 or discogs will return an error 404)
     */
    page?: number
    /**
     * Lang to use for Discogs
     */
    lang?: ELang
}
