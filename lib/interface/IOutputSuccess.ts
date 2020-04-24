import IItem from '@interface/IItem'
import { EType } from '@enum/EType'

/**
 * @interface IOutputSuccess Result provided to user
 */
export default interface IOutputSuccess {
    result: IItem[],
    page: {
        current: number,
        total: number
    },
    item: {
        total: number,
        per_page: number,
    },
    search: {
        value: string | number | undefined,
        type: EType
    },
    url_generated: string | null,
}