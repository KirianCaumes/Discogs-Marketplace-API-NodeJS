import UserAgent from 'user-agents'
import { parseHTML } from 'linkedom'
import {
    ECurrency, ELang, EType,
} from 'enums'
import {
    IInput, IOutputSuccess, IOutputError,
} from 'interfaces'
import { EDiscogsCountryNameToIsoCode, EDiscogsCurrencyToIsoCode } from 'enums/iso/translate'
import { ECountryCode, ECountryName } from 'enums/iso'
import axios from 'axios'

/**
 * Discogs Marketplace
 */
export default abstract class Marketplace {
    /**
     * Search elements on discogs
     * @returns Items found
     */
    public static async search({
        searchType = EType.STRING,
        searchValue = undefined,
        currency = undefined,
        genre = undefined,
        style = [],
        format = [],
        formatDescription = [],
        mediaCondition = [],
        year = undefined,
        years = undefined,
        isAudioSample = false,
        isMakeAnOfferOnly = false,
        from = undefined,
        seller = undefined,
        sort = undefined,
        limit = 25,
        page = undefined,
        lang = ELang.ENGLISH,
    }: IInput): Promise<IOutputSuccess> {
        try {
            const config: import('axios').AxiosRequestConfig = {
                url: this.generateUrl({ searchType, seller, lang }),
                method: 'GET',
                params: {
                    [searchType]: searchValue,
                    currency,
                    genre,
                    style: style?.length ? style : undefined,
                    format: format?.length ? format : undefined,
                    format_desc: formatDescription?.length ? formatDescription : undefined,
                    condition: mediaCondition?.length ? mediaCondition : undefined,
                    year: year && !years ? year : undefined,
                    year1: years?.min && !year ? years?.min : undefined,
                    year2: years?.max && !year ? years?.max : undefined,
                    audio: isAudioSample ? 1 : undefined,
                    offers: isMakeAnOfferOnly ? 1 : undefined,
                    ships_from: from?.length ? from : undefined,
                    limit,
                    page,
                    sort,
                },
                paramsSerializer: this.serializeParams,
                headers: {
                    'X-PJAX': 'true',
                    'User-Agent': new UserAgent().toString(),
                },
            }

            const { data: bodyHTML } = await axios.request(config)

            return this.getData(
                parseHTML(bodyHTML).document,
                axios.getUri(config),
                {
                    searchType, searchValue, limit, page,
                },
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { response, message } = error as import('axios').AxiosError
            if (response?.data && response.status)
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw {
                    message: parseHTML(response.data).document?.querySelector('h1 + p')?.innerHTML?.trim() ?? 'An error occured',
                    code: response.status,
                } as IOutputError

            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw {
                message: message || 'An error occured',
                code: 500,
            } as IOutputError
        }
    }

    /**
     * Generate URL to be parsed
     * @returns Url
     */
    private static generateUrl({
        searchType,
        seller,
        lang,
    }: Partial<IInput>): string {
        let url = `https://www.discogs.com/${lang}/`
        if (seller) {
            url += `seller/${seller}/`
            url += searchType === EType.USER ? 'mywants' : 'profile'
        } else {
            url += 'sell/'
            url += searchType === EType.USER ? 'mywants' : 'list'
        }
        return url
    }

    /**
     * Serialize params URL
     * @param params Object of GET parameters
     * @returns Url
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static serializeParams(params: { [key: string]: any }): string {
        const param: string[] = []
        // eslint-disable-next-line no-restricted-syntax
        for (const key in params)
            if (params[key] === undefined || params[key] === null)
                // eslint-disable-next-line no-continue
                continue
            else if (Array.isArray(params[key]))
                /** Custom handle for array */
                if (params[key].length > 0)
                    // eslint-disable-next-line no-restricted-syntax
                    for (const el of params[key])
                        param.push(`${key}=${encodeURIComponent(el)}`)
                else
                    // eslint-disable-next-line no-continue
                    continue
            else
                param.push(`${key}=${encodeURIComponent(params[key])}`)

        return param.join('&')
    }

    /**
     * Function to convert currency to ISO name
     * @param value String to clean
     * @returns Cleanup string
     */
    private static convertCurrency(value: string): string {
        if (!value)
            return value

        const currency: string = Object.keys(EDiscogsCurrencyToIsoCode).find(key => value.includes(key)) ?? ''

        if (!currency)
            return value

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currencyClean = (EDiscogsCurrencyToIsoCode as any)[currency]

        const amount = value
            .replace(currencyClean !== ECurrency.JPY ? /[.](?=.*[.])/g : /\./g, '') // Remove all dot but last, except if JPY
            .replace(currency, '') // Remove original currency
            .replace(/\s/g, '') // Remove spaces

        return `${amount} ${currencyClean}`
            .replace(/\s\s+/g, ' ') // Remove useless spaces
    }

    /**
     * Parse HTML to clean result
     * @param document Document to parse
     * @param urlGenerated Url generated
     * @returns Items found
     */
    private static getData(document: Document, urlGenerated: string, {
        searchType = EType.STRING,
        searchValue = undefined,
        limit = 25,
        page = 1,
    }: Partial<IInput>): IOutputSuccess {
        const totalItems = parseFloat(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            document.querySelector('.pagination_total')?.textContent?.split(' ')?.filter((x: any) => x).pop()?.replace(/(,|\.|\s)/g, '') || '0',
        )

        return {
            items: [...document.querySelectorAll('table.table_block tbody tr')]?.map(el => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const shipping: any = this.convertCurrency(
                    el.querySelector('.item_shipping')?.childNodes?.[0]?.textContent?.replace(/(\s+|\+)/g, ' ')?.trim()?.replace(',', '.') ?? '',
                )
                const have = Number.parseInt(el.querySelector('.community_summary .community_result:nth-child(1) .community_number')?.textContent ?? '', 10)
                const want = Number.parseInt(el.querySelector('.community_summary .community_result:nth-child(2) .community_number')?.textContent ?? '', 10)
                const countryName = el.querySelector('.seller_info li:nth-child(3)')?.textContent?.split(':')?.[1] ?? ''
                const countryCode = (Object.keys(ECountryCode).find((key: string) => (ECountryName[key as ECountryCode] === countryName))
                    || EDiscogsCountryNameToIsoCode[countryName as keyof typeof EDiscogsCountryNameToIsoCode]) as ECountryCode
                const releaseId = Number.parseInt(
                    el.querySelector<HTMLLinkElement>('a.item_release_link')?.href.split('release/')?.pop()?.split('-')?.shift() ?? '0', 10,
                )
                const itemId = Number.parseInt(el.querySelector<HTMLLinkElement>('a.item_description_title')?.href?.split('/').pop() ?? '0', 10)
                const notes = Number.parseInt(el.querySelector('.seller_info li:nth-child(2) .section_link')
                    ?.textContent?.replace(/\s+/g, ' ')?.trim()?.split(' ')?.[0]?.replace(/,/g, '') ?? '', 10)

                const originalTitle = el.querySelector('a.item_description_title')?.textContent
                const firstIndexOfDash = originalTitle?.indexOf(' - ') ?? -1
                const lastIndexOfParenthesis = originalTitle?.lastIndexOf(' (') ?? -1

                return {
                    id: Number.isNaN(itemId) ? 0 : itemId,
                    title: {
                        original: originalTitle ?? '',
                        artist: originalTitle?.substring(0, firstIndexOfDash) ?? '',
                        item: firstIndexOfDash > -1 && lastIndexOfParenthesis > -1
                            ? originalTitle?.substring(firstIndexOfDash + 3, lastIndexOfParenthesis) ?? ''
                            : '',
                        formats: lastIndexOfParenthesis > -1
                            ? (originalTitle?.substring(lastIndexOfParenthesis + 2, originalTitle.length - 1)?.split(', ') ?? [])
                            : [],
                    },
                    url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('a.item_description_title')?.href}`,
                    labels: [...el.querySelectorAll('.label_and_cat a[href^=\'https://www.discogs.com/\']')]
                        ?.map(x => x?.textContent ?? '')
                        ?.filter((value, index, self) => self.indexOf(value) === index),
                    catnos: el.querySelector('.label_and_cat .item_catno')?.textContent?.replace(/\s+/g, ' ')?.split(', ')?.filter(x => x !== 'none') ?? [],
                    imageUrl: el.querySelector('.marketplace_image')?.getAttribute('data-src') ?? '',
                    description: el.querySelector('.item_condition')?.nextElementSibling?.textContent?.replace(/\s+/g, ' ')?.trim() ?? '',
                    isAcceptingOffer: (el.querySelector('.item_add_to_cart p a strong')?.textContent?.split('/')?.length ?? 0) > 1,
                    isAvailable: !el.classList?.contains('unavailable'),
                    condition: {
                        media: {
                            full: el.querySelector('.item_condition span:nth-child(3)')?.textContent?.replace(/\s+/g, ' ')?.trim() ?? '',
                            short: el.querySelector('.item_condition span:nth-child(3)')?.textContent?.replace(/\s+/g, ' ')?.trim()?.match(/\(([^)]+)\)/)?.[1]
                                ?? '',
                        },
                        sleeve: {
                            full: el.querySelector('.item_condition span.item_sleeve_condition')?.textContent ?? '',
                            short: el.querySelector('.item_condition span.item_sleeve_condition')?.textContent?.match(/\(([^)]+)\)/)?.[1] ?? '',
                        },
                    },
                    seller: {
                        name: el.querySelector('.seller_info a')?.textContent ?? '',
                        url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('.seller_info a')?.href}`,
                        score: el.querySelector('.seller_info li:nth-child(2) strong')?.textContent ?? '',
                        notes: Number.isNaN(notes) ? 0 : notes,
                    },
                    price: {
                        base: this.convertCurrency(el.querySelector('.price')?.textContent?.replace(/\s+/g, ' ')?.replace(/,/, '.') ?? ''),
                        shipping: Number.isNaN(parseFloat(shipping)) ? null : shipping,
                    },
                    country: {
                        name: countryName,
                        code: countryCode,
                    },
                    community: {
                        have: Number.isNaN(have) ? 0 : have,
                        want: Number.isNaN(want) ? 0 : want,
                    },
                    release: {
                        id: Number.isNaN(releaseId) ? 0 : releaseId,
                        url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('a.item_release_link')?.href}`,
                    },
                }
            }) || [],
            page: {
                current: page,
                total: Math.ceil(totalItems / limit),
            },
            result: {
                total: totalItems,
                perPage: limit,
            },
            search: {
                value: searchValue ?? '',
                type: searchType,
            },
            urlGenerated: urlGenerated ?? '',
        }
    }
}
