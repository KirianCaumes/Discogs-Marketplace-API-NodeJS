import { parseHTML } from 'linkedom'
import Currency from 'data/currency.data'
import Country from 'data/country.data'
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT } from 'search'
import type { CurrencyKeys } from 'data/currency.data'
import type { CountryKeys } from 'data/country.data'
import type SearchResult from 'interfaces/search-result.interface'
import type { SearchParamsLegacy } from 'interfaces/search-params.interface'

/**
 * Generate URL to be parsed
 * @returns Url
 */
function generateUrl({
    seller,
    lang,
    user,
}: Required<Pick<SearchParamsLegacy, 'lang'>> & Pick<SearchParamsLegacy, 'seller' | 'user'>): string {
    const baseUrl = `https://www.discogs.com/${lang}`

    if (seller) {
        const path = user ? 'mywants' : 'profile'
        return `${baseUrl}/seller/${seller}/${path}`
    } else {
        return `${baseUrl}/sell/list`
    }
}

/**
 * Converts a currency string to a standardized format.
 * @param value String to clean
 * @returns Cleaned-up string
 */
function convertCurrency(value: string): SearchResult['items'][0]['price']['base'] | SearchResult['items'][0]['price']['shipping'] {
    if (!value) {
        return null
    }

    const currencyFound = Object.keys(Currency).find(key => value.includes(key)) as CurrencyKeys | undefined
    if (!currencyFound) {
        return null
    }

    const currencyClean = Currency[currencyFound]
    const amount = value
        .replace(currencyClean !== 'JPY' ? /[.](?=.*[.])/g : /\./g, '') // Remove all dots but the last, except for JPY
        .replace(currencyFound, '') // Remove original currency
        .replace(/\s\s+/g, '') // Remove spaces

    const amountParsed = currencyClean === 'JPY' ? Number.parseInt(amount) : Number.parseFloat(amount)

    if (Number.isNaN(amountParsed)) {
        return null
    }

    return currencyClean === 'JPY' ? `${amountParsed} ${currencyClean}` : (`${amountParsed.toFixed(2)} ${currencyClean}` as never)
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
    currency,
    genre,
    styles,
    formats,
    formatDescriptions,
    condition,
    years,
    isMakeAnOfferOnly = false,
    from,
    sort = DEFAULT_SORT,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    seller,
    lang = 'en',
    masterId,
    labelId,
    artistId,
    releaseId,
    user,
    query,
}: SearchParamsLegacy): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    /** Url to be called by the browser */
    const urlGenerated = [
        generateUrl({ seller, lang, user }),
        new URLSearchParams(
            [
                ['master_id', masterId?.toString() ?? ''],
                ['label_id', labelId?.toString() ?? ''],
                ['artist_id', artistId?.toString() ?? ''],
                ['release_id', releaseId?.toString() ?? ''],
                ['user', user?.toString() ?? ''],
                ['q', query ?? ''],
                ['currency', currency ?? ''],
                ['genre', genre ?? ''],
                ...(styles?.map(s => ['style', s]) ?? []),
                ...(formats?.map(f => ['format', f]) ?? []),
                ...(formatDescriptions?.map(fd => ['format_desc', fd]) ?? []),
                ['condition', condition ?? ''],
                ['year1', years?.min ? years.min.toString() : ''],
                ['year2', years?.max ? years.max.toString() : ''],
                ['offers', isMakeAnOfferOnly ? '1' : ''],
                ['ships_from', Object.keys(Country).find(key => from === Country[key as CountryKeys]) ?? ''],
                ['limit', limit.toString()],
                ['page', page.toString()],
                ['sort', sort],
            ].filter(([, p]) => !!p),
        ).toString(),
    ].join('?')

    const headers = new Headers({
        'User-Agent': 'Discogs',
        'Content-Type': 'application/json',
    })

    // If there a seller and user, we cannot use PJAX otherwise 404 error
    if (!(seller && user)) {
        headers.set('X-PJAX', 'true')
    }

    const response = await globalThis.fetch(urlGenerated, {
        headers,
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
            title: originalTitle,
            artists: [
                {
                    id: null,
                    name: firstIndexOfDash > -1 ? originalTitle.substring(0, firstIndexOfDash) : '',
                    url: null,
                },
            ],
            release: {
                id: safeParseInt(releaseHref.split('release/').pop()?.split('-').shift()),
                name:
                    firstIndexOfDash > -1 && lastIndexOfParenthesis > -1
                        ? originalTitle.substring(firstIndexOfDash + 3, lastIndexOfParenthesis)
                        : '',
                url: `https://www.discogs.com${releaseHref}`,
            },
            formats:
                lastIndexOfParenthesis > -1
                    ? originalTitle.substring(lastIndexOfParenthesis + 2, originalTitle.length - 1).split(', ')
                    : [],
            labels: [...el.querySelectorAll(".label_and_cat a[href^='https://www.discogs.com/']")]
                .map(x => ({
                    id: safeParseInt(x.getAttribute('href')?.split('label/').pop()?.split('-').shift()),
                    name: x.textContent?.trim() ?? '',
                    url: `https://www.discogs.com${x.getAttribute('href') ?? ''}`,
                }))
                .filter((value, index, self) => self.findIndex(v => v.name === value.name) === index),
            url: `https://www.discogs.com${itemHref}`,
            listedAt: null,
            catnos: getTextContent('.label_and_cat .item_catno', el) // cspell:disable-line
                .split(', ')
                .filter(x => x !== 'none'),
            imageUrl: el.querySelector('.marketplace_image')?.getAttribute('data-src') ?? null,
            description: getTextContent('.item_condition + *', el) || null,
            isAcceptingOffer: getTextContent('.item_add_to_cart p a strong', el).split('/').length > 1,
            isAvailable: !el.classList.contains('unavailable'),
            condition: {
                media: {
                    full: mediaCondition,
                    short: /\(([^)]+)\)/.exec(mediaCondition)?.[1] ?? '',
                },
                sleeve: {
                    full: sleeveCondition || null,
                    short: /\(([^)]+)\)/.exec(sleeveCondition)?.[1] ?? null,
                },
            },
            seller: {
                name: getTextContent('.seller_info a', el),
                url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('.seller_info a')?.getAttribute('href') ?? ''}`,
                score: getTextContent('.seller_info li:nth-child(2) strong', el) || null,
                notes: safeParseInt(getTextContent('.seller_info li:nth-child(2) .section_link', el)) || null,
            },
            price: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                base: convertCurrency(getTextContent('.price', el).replace(/,/, '.'))!,
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
        } satisfies SearchResult['items'][0]
    })

    return { total, items, urlGenerated }
}
