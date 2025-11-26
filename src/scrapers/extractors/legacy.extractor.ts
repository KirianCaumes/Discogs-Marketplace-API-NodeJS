import type { CountryKeys, CountryType } from 'data/country.data'
import type { CurrencyKeys, CurrencyType } from 'data/currency.data'
import type SearchResult from 'interfaces/search-result.interface'

// These variables are injected by the browser context when the page is loaded.
const { Country, Currency } = globalThis as typeof globalThis & {
    /** Country */
    Country: CountryType
    /** Currency */
    Currency: CurrencyType
}

/**
 * Parses the page and returns the items found.
 * @returns Items found and total
 */
export default function extractLegacy(): {
    /** Items */
    items: SearchResult['items']
    /** Total */
    total: number
} {
    /**
     * Converts a currency string to a standardized format.
     * @param value String to clean
     * @returns Cleaned-up string
     */
    const convertCurrency = (value: string): SearchResult['items'][0]['price']['base'] | SearchResult['items'][0]['price']['shipping'] => {
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
    const safeParseInt = (value: string | undefined): number => {
        const parsed = Number.parseInt(value ?? '', 10)
        return Number.isNaN(parsed) ? 0 : parsed
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
                    ? originalTitle
                          .substring(lastIndexOfParenthesis + 2, originalTitle.length - 1)
                          .split(', ')
                          .filter(x => x)
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

    return { items, total }
}
