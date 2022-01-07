import IItem from '@interface/IItem'
import EType from '@enum/EType'

/**
 * Result provided to user
 */
export default interface IOutputSuccess {
    items: IItem[]
    page: {
        current: number
        total: number
    }
    result: {
        total: number
        perPage: number
    }
    search: {
        value: string | number
        type: EType
    }
    urlGenerated: string
}
