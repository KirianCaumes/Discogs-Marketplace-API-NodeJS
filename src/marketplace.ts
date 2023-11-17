import UserAgent from 'user-agents'
import { parseHTML } from 'linkedom'
import { chromium as playwright } from 'playwright-chromium'
import { CURRENCIES, COUNTRIES } from 'data'
import type { InputInterface, OutputErrorInterface, OutputSuccessInterface } from 'interfaces'

/**
 * Discogs Marketplace
 */
export default abstract class Marketplace {
    /**
     * Search elements on discogs
     * @returns Items found
     */
    public static async search({
        searchType = 'q',
        searchValue = undefined,
        currency = undefined,
        genre = undefined,
        style = [],
        format = [],
        formatDescription = [],
        condition = [],
        year = undefined,
        years = undefined,
        isAudioSample = false,
        isMakeAnOfferOnly = false,
        from = undefined,
        seller = undefined,
        sort = 'Listed Newest',
        limit = 25,
        page = 1,
        lang = 'en',
    }: InputInterface): Promise<OutputSuccessInterface> {
        try {
            /** Init browser */
            const browser = await playwright.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

            /** Init context */
            const browserContext = await browser.newContext({
                userAgent: new UserAgent({ platform: 'Win32' }).toString(),
                extraHTTPHeaders: {
                    'X-PJAX': 'true',
                },
            })

            /** Init page */
            const browserPage = await browserContext.newPage()

            /** Block useless resources */
            await browserPage.route('**/*', route =>
                [
                    'stylesheet',
                    'image',
                    'media',
                    'font',
                    'script',
                    'texttrack',
                    'xhr',
                    'fetch',
                    'eventsource',
                    'websocket',
                    'manifest',
                    'other',
                ].includes(route.request().resourceType())
                    ? route.abort()
                    : route.continue(),
            )

            /** Url to call */
            const url = [
                this.generateUrl({ searchType, seller, lang }),
                this.serializeParams({
                    [searchType]: searchValue,
                    currency,
                    genre,
                    style: style?.length ? style : undefined,
                    format: format?.length ? format : undefined,
                    format_desc: formatDescription?.length ? formatDescription : undefined,
                    condition: condition?.length ? condition : undefined,
                    year: year && !years ? year : undefined,
                    year1: years?.min && !year ? years?.min : undefined,
                    year2: years?.max && !year ? years?.max : undefined,
                    audio: isAudioSample ? 1 : undefined,
                    offers: isMakeAnOfferOnly ? 1 : undefined,
                    ships_from: from?.length ? from : undefined,
                    limit,
                    page,
                    sort,
                }),
            ].join('?')

            /** Init page */
            const response = await browserPage.goto(url, { waitUntil: 'domcontentloaded' })

            /** Get HTML */
            const bodyHTML = await browserPage.content()

            /** Close browser */
            await browser.close()

            /** If error, reject */
            if ((response?.status() ?? 0) >= 400) {
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw {
                    message: parseHTML(bodyHTML).document?.querySelector('h1 + p')?.innerHTML?.trim() ?? 'An error occurred',
                    code: response?.status() || 500,
                } as OutputErrorInterface
            }

            return this.getData(parseHTML(bodyHTML).document, browserPage.url(), {
                searchType,
                searchValue,
                limit,
                page,
            })
        } catch (error: unknown) {
            if ((error as OutputErrorInterface).message && (error as OutputErrorInterface).code) {
                // Rethrow error
                throw error
            }

            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw {
                message: (error as Error)?.message || 'An error occurred',
                code: 500,
            } as OutputErrorInterface
        }
    }

    /**
     * Generate URL to be parsed
     * @returns Url
     */
    private static generateUrl({ searchType, seller, lang }: Partial<InputInterface>): string {
        let url = `https://www.discogs.com/${lang}/`
        if (seller) {
            url += `seller/${seller}/`
            url += searchType === 'user' ? 'mywants' : 'profile'
        } else {
            url += 'sell/'
            url += searchType === 'user' ? 'mywants' : 'list'
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
        const param: Array<string> = []
        // eslint-disable-next-line no-restricted-syntax
        for (const key in params) {
            if (params[key] === undefined || params[key] === null) {
                // eslint-disable-next-line no-continue
                continue
            } else if (Array.isArray(params[key])) {
                /** Custom handle for array */
                if (params[key].length > 0) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const el of params[key]) {
                        param.push(`${key}=${encodeURIComponent(el)}`)
                    }
                } else {
                    // eslint-disable-next-line no-continue
                    continue
                }
            } else {
                param.push(`${key}=${encodeURIComponent(params[key])}`)
            }
        }

        return param.join('&')
    }

    /**
     * Function to convert currency to ISO name
     * @param value String to clean
     * @returns Cleanup string
     */
    private static convertCurrency(value: string): string {
        if (!value) {
            return value
        }

        const currencyFound = Object.keys(CURRENCIES).find(key => value.includes(key)) ?? ''

        if (!currencyFound) {
            return value
        }

        const currencyClean = CURRENCIES[currencyFound as keyof typeof CURRENCIES]

        const amount = value
            .replace(currencyClean !== 'JPY' ? /[.](?=.*[.])/g : /\./g, '') // Remove all dot but last, except if JPY
            .replace(currencyFound, '') // Remove original currency
            .replace(/\s/g, '') // Remove spaces

        return `${amount} ${currencyClean}`.replace(/\s\s+/g, ' ') // Remove useless spaces
    }

    /**
     * Parse HTML to clean result
     * @param document Document to parse
     * @param urlGenerated Url generated
     * @returns Items found
     */
    private static getData(
        document: Document,
        urlGenerated: string,
        { searchType = 'q', searchValue = undefined, limit = 25, page = 1 }: Partial<InputInterface>,
    ): OutputSuccessInterface {
        const totalItems = parseFloat(
            document
                .querySelector('.pagination_total')
                ?.textContent?.split(' ')
                ?.filter(x => x)
                .pop()
                ?.replace(/(,|\.|\s)/g, '') || '0',
        )

        return {
            items:
                [...document.querySelectorAll('table.table_block tbody tr')]?.map(el => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const shipping: any = this.convertCurrency(
                        el
                            .querySelector('.item_shipping')
                            ?.childNodes?.[0]?.textContent?.replace(/(\s+|\+)/g, ' ')
                            ?.trim()
                            ?.replace(',', '.') ?? '',
                    )
                    const have = Number.parseInt(
                        el.querySelector('.community_summary .community_result:nth-child(1) .community_number')?.textContent ?? '',
                        10,
                    )
                    const want = Number.parseInt(
                        el.querySelector('.community_summary .community_result:nth-child(2) .community_number')?.textContent ?? '',
                        10,
                    )
                    const countryName = el.querySelector('.seller_info li:nth-child(3)')?.textContent?.split(':')?.pop() ?? ''
                    const countryCode = COUNTRIES[countryName as keyof typeof COUNTRIES]
                    const releaseId = Number.parseInt(
                        el.querySelector<HTMLLinkElement>('a.item_release_link')?.href.split('release/')?.pop()?.split('-')?.shift() ?? '0',
                        10,
                    )
                    const itemId = Number.parseInt(
                        el.querySelector<HTMLLinkElement>('a.item_description_title')?.href?.split('/').pop() ?? '0',
                        10,
                    )
                    const notes = Number.parseInt(
                        el
                            .querySelector('.seller_info li:nth-child(2) .section_link')
                            ?.textContent?.replace(/\s+/g, ' ')
                            ?.trim()
                            ?.split(' ')?.[0]
                            ?.replace(/,/g, '') ?? '',
                        10,
                    )

                    const originalTitle = el.querySelector('a.item_description_title')?.textContent
                    const firstIndexOfDash = originalTitle?.indexOf(' - ') ?? -1
                    const lastIndexOfParenthesis = originalTitle?.lastIndexOf(' (') ?? -1

                    return {
                        id: Number.isNaN(itemId) ? 0 : itemId,
                        title: {
                            original: originalTitle ?? '',
                            artist: originalTitle?.substring(0, firstIndexOfDash) ?? '',
                            item:
                                firstIndexOfDash > -1 && lastIndexOfParenthesis > -1
                                    ? originalTitle?.substring(firstIndexOfDash + 3, lastIndexOfParenthesis) ?? ''
                                    : '',
                            formats:
                                lastIndexOfParenthesis > -1
                                    ? originalTitle?.substring(lastIndexOfParenthesis + 2, originalTitle.length - 1)?.split(', ') ?? []
                                    : [],
                        },
                        url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('a.item_description_title')?.href}`,
                        labels: [...el.querySelectorAll(".label_and_cat a[href^='https://www.discogs.com/']")]
                            ?.map(x => x?.textContent ?? '')
                            ?.filter((value, index, self) => self.indexOf(value) === index),
                        catnos:
                            el
                                // cspell: disable-next-line
                                .querySelector('.label_and_cat .item_catno')
                                ?.textContent?.replace(/\s+/g, ' ')
                                ?.split(', ')
                                ?.filter(x => x !== 'none') ?? [],
                        imageUrl: el.querySelector('.marketplace_image')?.getAttribute('data-src') ?? '',
                        description:
                            el.querySelector('.item_condition')?.nextElementSibling?.textContent?.replace(/\s+/g, ' ')?.trim() ?? '',
                        isAcceptingOffer: (el.querySelector('.item_add_to_cart p a strong')?.textContent?.split('/')?.length ?? 0) > 1,
                        isAvailable: !el.classList?.contains('unavailable'),
                        condition: {
                            media: {
                                full:
                                    el.querySelector('.item_condition span:nth-child(3)')?.textContent?.replace(/\s+/g, ' ')?.trim() ?? '',
                                short:
                                    el
                                        .querySelector('.item_condition span:nth-child(3)')
                                        ?.textContent?.replace(/\s+/g, ' ')
                                        ?.trim()
                                        ?.match(/\(([^)]+)\)/)?.[1] ?? '',
                            },
                            sleeve: {
                                full: el.querySelector('.item_condition span.item_sleeve_condition')?.textContent ?? '',
                                short:
                                    el
                                        .querySelector('.item_condition span.item_sleeve_condition')
                                        ?.textContent?.match(/\(([^)]+)\)/)?.[1] ?? '',
                            },
                        },
                        seller: {
                            name: el.querySelector('.seller_info a')?.textContent ?? '',
                            url: `https://www.discogs.com${el.querySelector<HTMLLinkElement>('.seller_info a')?.href}`,
                            score: el.querySelector('.seller_info li:nth-child(2) strong')?.textContent ?? '',
                            notes: Number.isNaN(notes) ? 0 : notes,
                        },
                        price: {
                            base: this.convertCurrency(
                                el.querySelector('.price')?.textContent?.replace(/\s+/g, ' ')?.replace(/,/, '.') ?? '',
                            ),
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
