import IOutputSuccess from '@interface/IOutputSuccess'
import IInput from '@interface/IInput'

/**
 * Main content
 */
export interface IDiscogsMarketplace {
    /**
     * Search elements on discogs
     */
    search(data: IInput): Promise<IOutputSuccess>
}
