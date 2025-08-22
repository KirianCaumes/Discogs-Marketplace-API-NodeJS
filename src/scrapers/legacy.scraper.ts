import { parseHTML } from 'linkedom'
import Currency from 'data/currency.data'
import Country from 'data/country.data'
import type { CurrencyKeys, CurrencyValues } from 'data/currency.data'
import type { CountryKeys } from 'data/country.data'
import type SearchResult from 'interfaces/search-result.interface'
import type SearchParams from 'interfaces/search-params.interface'
import type { SearchParamsDefaulted } from 'interfaces/search-params.interface'

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

/**
 * Converts a currency string to a standardized format.
 * @param value String to clean
 * @returns Cleaned-up string
 */
function convertCurrency(value: string): `${number} ${CurrencyValues}` | '' {
    if (!value) {
        return ''
    }

    const currencyFound = Object.keys(Currency).find(key => value.includes(key)) as CurrencyKeys | undefined
    if (!currencyFound) {
        return ''
    }

    const currencyClean = Currency[currencyFound]
    const amount = value
        .replace(currencyClean !== 'JPY' ? /[.](?=.*[.])/g : /\./g, '') // Remove all dots but the last, except for JPY
        .replace(currencyFound, '') // Remove original currency
        .replace(/\s\s+/g, '') // Remove spaces

    const amountParsed = Number.parseFloat(amount)

    if (Number.isNaN(amountParsed)) {
        return ''
    }

    return `${amountParsed} ${currencyClean}`
}

/**
 * Safely parses a number from a string.
 * @param value String to parse
 * @returns Parsed number or 0 if invalid
 */
function safeParseInt(value: string | undefined): number {
    const parsed = Number.parseInt(value ?? '', 10)
    return Number.isNaN(parsed) ? 0 : parsed
}

/**
 * Parses the page and returns the items found.
 * @param url Url to scrape
 * @returns Items found and total
 */
export default async function scrapeLegacy({
    searchType,
    searchValue,
    currency,
    genre,
    style,
    format,
    formatDescription,
    condition,
    year,
    years,
    isMakeAnOfferOnly,
    from,
    seller,
    sort,
    limit,
    page,
    lang,
}: SearchParamsDefaulted): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    /** Url to be called by the browser */
    const urlGenerated = [
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
            limit,
            page,
            sort,
        }),
    ].join('?')

    const response = await globalThis.fetch(urlGenerated, {
        headers: {
            'User-Agent': 'Discogs',
            'Content-Type': 'application/json',
            'X-PJAX': 'true',
        },
        referrer: 'https://discogs.com',
    })

    const content = await response.text()

    const { document } = parseHTML(content)

    // If error status, reject
    if (response.status >= 400) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const errorMessage = document.querySelector('h1 + p')?.innerHTML.trim() || `An error ${response.status} occurred.`
        throw new Error(errorMessage)
    }

    /**
     * Extracts and cleans text content from an element.
     * @param selector CSS selector
     * @param context Parent element to query from
     * @returns Cleaned text content or an empty string
     */
    const getTextContent = (selector: string, context: Element | Document = document): string =>
        context.querySelector(selector)?.textContent?.trim() ?? ''

    const total = safeParseInt(
        getTextContent('.pagination_total')
            .split(' ')
            .filter(x => x)
            .pop()
            ?.replace(/(,|\.|\s)/g, ''),
    )

    const items = [...document.querySelectorAll('table.table_block tbody tr')].map(el => {
        const itemHref = el.querySelector<HTMLLinkElement>('a.item_description_title')?.getAttribute('href') ?? ''

        const mediaCondition = getTextContent('.item_condition span:nth-child(3)', el).split('\n')[0] ?? ''
        const sleeveCondition = getTextContent('.item_condition span.item_sleeve_condition', el)

        const countryName = getTextContent('.seller_info li:nth-child(3)', el).split(':').pop() ?? ''

        const originalTitle = getTextContent('a.item_description_title', el)
        const firstIndexOfDash = originalTitle.indexOf(' - ')
        const lastIndexOfParenthesis = originalTitle.lastIndexOf(' (')

        const releaseHref = el.querySelector<HTMLLinkElement>('a.item_release_link')?.getAttribute('href') ?? ''

        return {
            id: safeParseInt(itemHref.split('/').pop()),
            title: {
                original: originalTitle,
                artist: firstIndexOfDash > -1 ? originalTitle.substring(0, firstIndexOfDash) : '',
                item:
                    firstIndexOfDash > -1 && lastIndexOfParenthesis > -1
                        ? originalTitle.substring(firstIndexOfDash + 3, lastIndexOfParenthesis)
                        : '',
                formats:
                    lastIndexOfParenthesis > -1
                        ? originalTitle.substring(lastIndexOfParenthesis + 2, originalTitle.length - 1).split(', ')
                        : [],
            },
            url: `https://www.discogs.com${itemHref}`,
            listedAt: null,
            labels: [...el.querySelectorAll(".label_and_cat a[href^='https://www.discogs.com/']")]
                .map(x => x.textContent?.trim() ?? '')
                .filter((value, index, self) => self.indexOf(value) === index),
            catnos: getTextContent('.label_and_cat .item_catno', el) // cspell:disable-line
                .split(', ')
                .filter(x => x !== 'none'),
            imageUrl: el.querySelector('.marketplace_image')?.getAttribute('data-src') ?? '',
            description: getTextContent('.item_condition + *', el),
            isAcceptingOffer: getTextContent('.item_add_to_cart p a strong', el).split('/').length > 1,
            isAvailable: !el.classList.contains('unavailable'),
            condition: {
                media: {
                    full: mediaCondition,
                    short: /\(([^)]+)\)/.exec(mediaCondition)?.[1] ?? '',
                },
                sleeve: {
                    full: sleeveCondition,
                    short: /\(([^)]+)\)/.exec(sleeveCondition)?.[1] ?? '',
                },
            },
            seller: {
                name: getTextContent('.seller_info a', el),
                url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('.seller_info a')?.getAttribute('href') ?? ''}`,
                score: getTextContent('.seller_info li:nth-child(2) strong', el),
                notes: safeParseInt(getTextContent('.seller_info li:nth-child(2) .section_link', el)),
            },
            price: {
                base: convertCurrency(getTextContent('.price', el).replace(/,/, '.')),
                shipping: convertCurrency(
                    getTextContent('.item_shipping', el)
                        .replace(/(\s+|\+)/g, ' ')
                        .replace(',', '.'),
                ),
            },
            country: {
                name: countryName,
                code: Country[countryName as CountryKeys],
            },
            community: {
                have: safeParseInt(getTextContent('.community_summary .community_result:nth-child(1) .community_number', el)),
                want: safeParseInt(getTextContent('.community_summary .community_result:nth-child(2) .community_number', el)),
            },
            release: {
                id: safeParseInt(releaseHref.split('release/').pop()?.split('-').shift()),
                url: `https://www.discogs.com${releaseHref}`,
            },
        }
    }) satisfies SearchResult['items']

    return { total, items, urlGenerated }
}
