/**
 * Response of the wantlist of a user, from the Discogs API
 * {@link https://www.discogs.com/developers#page:user-wantlist,header:user-wantlist-wantlist}
 */
export default interface WantlistResultApi {
    /** Message, on error */
    message?: string
    /** Pagination */
    pagination?: {
        /** Page */
        page?: number
        /** Pages */
        pages?: number
        /** Per page */
        per_page?: number
        /** Items */
        items?: number
        /** Urls */
        urls?: {
            /** First */
            first?: string
            /** Prev */
            prev?: string
            /** Next */
            next?: string
            /** Last */
            last?: string
        }
    }
    /** Wants */
    wants?: Array<{
        /** Release ID */
        id?: number
        /** Resource url */
        resource_url?: string
        /** Rating */
        rating?: number
        /** Notes */
        notes?: string
        /** Date added */
        date_added?: string
        /** Basic information */
        basic_information?: {
            /** Release ID */
            id?: number
            /** Master ID */
            master_id?: number
            /** Master url */
            master_url?: string | null
            /** Resource url */
            resource_url?: string
            /** Title */
            title?: string
            /** Year */
            year?: number
            /** Formats */
            formats?: Array<{
                /** Name */
                name?: string
                /** Quantity */
                qty?: string
                /** Descriptions */
                descriptions?: Array<string>
                /** Text */
                text?: string
            }>
            /** Artists */
            artists?: Array<{
                /** Name */
                name?: string
                /** Artist name variation */
                anv?: string
                /** Join */
                join?: string
                /** Role */
                role?: string
                /** Tracks */
                tracks?: string
                /** ID */
                id?: number
                /** Resource url */
                resource_url?: string
            }>
            /** Labels */
            labels?: Array<{
                /** Name */
                name?: string
                /** Catalog number */
                catno?: string
                /** Entity type */
                entity_type?: string
                /** Entity type name */
                entity_type_name?: string
                /** ID */
                id?: number
                /** Resource url */
                resource_url?: string
            }>
            /** Thumbnail */
            thumb?: string
            /** Cover image */
            cover_image?: string
            /** Genres */
            genres?: Array<string>
            /** Styles */
            styles?: Array<string>
        }
    }>
}
