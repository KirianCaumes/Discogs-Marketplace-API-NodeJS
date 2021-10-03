import IItem from '@interface/IItem'
import { EType } from '@enum/EType'

/**
 * @interface IOutputSuccess Result provided to user
 */
export default interface IOutputSuccess {
    result: IItem[]
    page: {
        current: number
        total: number
    }
    item: {
        total: number
        perPage: number
    }
    search: {
        value: string | number
        type: EType
    }
    urlGenerated: string
}