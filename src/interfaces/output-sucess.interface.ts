import { EType } from 'enums'
import IItem from 'interfaces/item.interface'

/**
 * Result provided to user
 */
export default interface IOutputSuccess {
    /** Items */
    items: IItem[]
    /** Page */
    page: {
        /** Current */
        current: number
        /** Total */
        total: number
    }
    /** Result */
    result: {
        /** Total */
        total: number
        /** PerPage */
        perPage: number
    }
    /** Search */
    search: {
        /** Value */
        value: string | number
        /** Type */
        type: EType
    }
    /** UrlGenerated */
    urlGenerated: string
}
