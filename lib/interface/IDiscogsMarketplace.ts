import IOutputSuccess from "@interface/IOutputSuccess"
import IInput from "@interface/IInput"

/**
 * @interface IDiscogsMarketplace Public interface
 */
export interface IDiscogsMarketplace {
    /**
     * Search elements on discogs
     * @param {IInput} data
     */
    search(data: IInput): Promise<IOutputSuccess>
}