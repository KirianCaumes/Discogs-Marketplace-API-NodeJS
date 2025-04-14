import type { CurrencyKeys, CurrencyType, CurrencyValues } from 'data/currency.data'
import type { CountryKeys, CountryType } from 'data/country.data'
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
 * This function is called by the browser context when the page is loaded.
 * @returns Items found and total
 */
export default function scrape(): Pick<SearchResult, 'items'> & {
    /** Total items found */
    total: SearchResult['result']['total']
} {
    /**
     * Converts a currency string to a standardized format.
     * @param value String to clean
     * @returns Cleaned-up string
     */
    const convertCurrency = (value: string): `${number} ${CurrencyValues}` | '' => {
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

    return { total, items }
}
