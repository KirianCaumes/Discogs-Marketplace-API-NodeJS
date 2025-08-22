import { parseHTML } from 'linkedom'
import scrape from 'scrape'
import type SearchParams from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'

/**
 * Performs a search on the Discogs marketplace using the provided parameters.
 * @returns A promise that resolves to the search results, including items found, pagination details, and the generated URL.
 */
export default async function search({
    searchType = 'q',
    searchValue,
    currency,
    genre,
    style,
    format,
    formatDescription,
    condition,
    year,
    years,
    isMakeAnOfferOnly = false,
    from,
    seller,
    hoursRange,
    sort = 'listed,desc',
    limit = 25,
    page = 1,
    lang = 'en',
}: SearchParams): Promise<SearchResult> {
    /** Url to be called by the browser */
    const url = [
        generateUrl({ searchType, seller, lang }),
        serializeParams({
            [searchType]: searchValue,
            currency,
            genre,
            style: style?.length ? style : null,
            format: format?.length ? format : null,
            format_desc: formatDescription?.length ? formatDescription : null,
            condition: condition?.length ? condition : null,
            year: year && !years ? year : null,
            year1: years?.min && !year ? years.min : null,
            year2: years?.max && !year ? years.max : null,
            offers: isMakeAnOfferOnly ? 1 : null,
            ships_from: from,
            hours_range: hoursRange,
            limit,
            page,
            sort,
        }),
    ].join('?')

    const response = await globalThis.fetch(url, {
        headers: {
            'User-Agent': 'Discogs',
            'Content-Type': 'application/json',
            'X-PJAX': 'true',
        },
        referrer: 'https://discogs.com',
    })

    const content = await response.text()

    const { document } = parseHTML(content)

    const { items, total } = scrape(document)

    // If error status, reject
    if (response.status >= 400) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const errorMessage = document.querySelector('h1 + p')?.innerHTML.trim() || `An error ${response.status} occurred.`
        throw new Error(errorMessage)
    }

    return {
        items,
        result: {
            total,
            perPage: limit,
        },
        page: {
            current: page,
            total: Math.ceil(total / limit),
        },
        urlGenerated: url,
    }
}

/**
 * Generate URL to be parsed
 * @returns Url
 */
function generateUrl({
    searchType,
    seller,
    lang,
}: Required<Pick<SearchParams, 'searchType' | 'lang'>> & Pick<SearchParams, 'seller'>): string {
    const baseUrl = `https://www.discogs.com/${lang}`

    if (seller) {
        const path = searchType === 'user' ? 'mywants' : 'profile'
        return `${baseUrl}/seller/${seller}/${path}`
    } else {
        const path = searchType === 'user' ? 'mywants' : 'list'
        return `${baseUrl}/sell/${path}`
    }
}

/**
 * Serialize params URL
 * @param params Object of GET parameters
 * @returns Url
 */
function serializeParams(params: Record<string, unknown>): string {
    return Object.entries(params)
        .flatMap(([key, value]) => {
            if (value === undefined || value === null) {
                return []
            }

            if (Array.isArray(value)) {
                return value.map(v => `${key}=${encodeURIComponent(v as string)}`)
            }

            return [`${key}=${encodeURIComponent(value as string)}`]
        })
        .join('&')
}
