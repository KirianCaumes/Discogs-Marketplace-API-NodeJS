/**
 * Types of search
 * @type {Object.<string, string>} 
 * @readonly
 */
export enum EType {
    /** 
     * String search
     */
    STRING = "q",
    /** 
     * Master's id search
     */
    MASTER = "master",
    /** 
     * Release's id search
     */
    RELEASE = "release_id",
    /** 
     * Label's id search
     */
    LABEL = "label_id",
    /** 
     * Artist's id search
     */
    ARTIST = "artist_id",
    /** 
     * User's name search into his wantlist
     */
    USER = "user"
}
