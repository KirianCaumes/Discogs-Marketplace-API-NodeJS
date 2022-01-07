/**
 * Sorts of search
 */
enum ESort {
    /**
     * Listed Newest
     */
    LISTED_NEWEST = 'listed,desc',
    /**
     * Listed Oldest
     */
    LISTED_OLDEST = 'listed,asc',
    /**
     * Condition (M)-(P)
     */
    CONDITION_MP = 'condition,desc',
    /**
     * Condition (P)-(M)
     */
    CONDITION_PM = 'condition,asc',
    /**
     * Artist A-Z
     */
    ARTIST_AZ = 'artist,asc',
    /**
     * Artist Z-A
     */
    ARTIST_ZA = 'artist,desc',
    /**
     * Title A-Z
     */
    TITLE_AZ = 'title,asc',
    /**
     * Title Z-A
     */
    TITLE_ZA = 'title,desc',
    /**
     * Label A-Z
     */
    LABEL_AZ = 'label,asc',
    /**
     * Label Z-A
     */
    LABEL_ZA = 'label,desc',
    /**
     * Seller A-Z
     */
    SELLER_AZ = 'seller,asc',
    /**
     * Seller Z-A
     */
    SELLER_ZA = 'seller,desc',
    /**
     * Price Lowest
     */
    PRICE_LOWEST = 'price,asc',
    /**
     * Price Highest
     */
    PRICE_HIGHEST = 'price,desc',
}

export default ESort
