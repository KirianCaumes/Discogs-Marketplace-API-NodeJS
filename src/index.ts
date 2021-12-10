import ECurrency from '@enum/ECurrency'
import EFormat from '@enum/EFormat'
import EFormatDescription from '@enum/EFormatDescription'
import EFrom from '@enum/EFrom'
import EGenre from '@enum/EGenre'
import ELang from '@enum/ELang'
import EMediaCondition from '@enum/EMediaCondition'
import ESort from '@enum/ESort'
import EStyle from '@enum/EStyle'
import EType from '@enum/EType'
import { IDiscogsMarketplace } from '@interface/IDiscogsMarketplace'
import IInput from '@interface/IInput'
import IItem from '@interface/IItem'
import IOutputError from '@interface/IOutputError'
import IOutputSuccess from '@interface/IOutputSuccess'
import IYears from '@interface/IYears'
import TLimit from '@type/TLimit'
import Marketplace from '@main/marketplace'

export {
    ECurrency,
    EFormat,
    EFormatDescription,
    EFrom,
    EGenre,
    ELang,
    EMediaCondition,
    ESort,
    EStyle,
    EType,
}

export {
    IInput,
    IItem,
    IOutputError,
    IOutputSuccess,
    IYears,
    IDiscogsMarketplace,
}

export {
    TLimit,
}

const DiscogsMarketplace: IDiscogsMarketplace = {
    search: (data: IInput): Promise<IOutputSuccess> => {
        const marketplace = new Marketplace(data)
        return marketplace.search()
    },
}

export default DiscogsMarketplace
