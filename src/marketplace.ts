import ECountryCode from '@enum/iso/ECountryCode'
import ECountryName from '@enum/iso/ECountryName'
import ECurrency from '@enum/ECurrency'
import EFormat from '@enum/EFormat'
import EFormatDescription from '@enum/EFormatDescription'
import EFrom from '@enum/EFrom'
import EGenre from '@enum/EGenre'
import ELang from '@enum/ELang'
import EMediaCondition from '@enum/EMediaCondition'
import ESort from '@enum/ESort'
import EStyle from '@enum/EStyle'
import EType from '@enum/EType'
import IInput from '@interface/IInput'
import IOutputError from '@interface/IOutputError'
import IOutputSuccess from '@interface/IOutputSuccess'
import IYears from '@interface/IYears'
import TLimit from '@type/TLimit'
import { chromium as playwright } from 'playwright-chromium'
import UserAgent from 'user-agents'
import EDiscogsCurrencyToIsoCode from '@enum/iso/translate/EDiscogsCurrencyToIsoCode'
import EDiscogsCountryNameToIsoCode from '@enum/iso/translate/EDiscogsCountryNameToIsoCode'
import { parseHTML } from 'linkedom'

/**
 * Discogs Marketplace
 */
export default class Marketplace {
    private searchType: EType

    private searchValue: string | number | undefined

    private currency?: ECurrency

    private genre?: EGenre

    private style?: EStyle[]

    private format?: EFormat[]

    private formatDescription?: EFormatDescription[]

    private mediaCondition?: EMediaCondition[]

    private year?: number

    private years?: IYears

    private isAudioSample: boolean

    private isMakeAnOfferOnly: boolean

    private from?: EFrom

    private seller?: string

    private sort: ESort

    private limit: TLimit

    private page: number

    private lang: ELang

    /** Url generated by Playwright */
    private url = ''

    constructor({
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
        sort = ESort.LISTED_NEWEST,
        limit = 25,
        page = 1,
        lang = ELang.ENGLISH,
    }: IInput) {
        this.searchType = searchType
        this.searchValue = searchValue
        this.currency = currency
        this.genre = genre
        this.style = style
        this.format = format
        this.formatDescription = formatDescription
        this.mediaCondition = mediaCondition
        this.year = year
        this.years = years
        this.isAudioSample = isAudioSample
        this.isMakeAnOfferOnly = isMakeAnOfferOnly
        this.from = from
        this.seller = seller
        this.sort = sort
        this.limit = limit
        this.page = page
        this.lang = lang
    }

    /**
     * Search elements on discogs
     * @returns Items found
     */
    public async search(): Promise<IOutputSuccess> {
        try {
            /** Init browser */
            const browser = await playwright.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

            /** Init context */
            const context = await browser.newContext({
                userAgent: new UserAgent().toString(),
            })

            /** Init page */
            const page = await context.newPage()

            /** Block useless ressources */
            await page.route('**/*', route => ([
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
            ].includes(route.request().resourceType()) ? route.abort() : route.continue()))

            /** Init page */
            const response = await page.goto(
                `${this.generateUrl()}?${this.serializeParams({
                    [this.searchType]: this.searchValue,
                    currency: this.currency,
                    genre: this.genre,
                    style: this.style?.length ? this.style : undefined,
                    format: this.format?.length ? this.format?.[0] : undefined,
                    format_desc: this.formatDescription?.length ? this.formatDescription[0] : undefined,
                    condition: this.mediaCondition?.length ? this.mediaCondition[0] : undefined,
                    year: this.year && !this.years ? this.year : undefined,
                    year1: this.years?.min && !this.year ? this.years?.min : undefined,
                    year2: this.years?.max && !this.year ? this.years?.max : undefined,
                    audio: this.isAudioSample ? 1 : 0,
                    offers: this.isMakeAnOfferOnly ? 1 : 0,
                    ships_from: this.from?.length ? this.from : undefined,
                    limit: this.limit,
                    page: this.page,
                    sort: this.sort,
                })}`,
            )

            /** Get url */
            this.url = page.url()

            /** Get HTML */
            const bodyHTML = await page.evaluate(() => document.getElementById('page_content')?.outerHTML)

            /** Close browser */
            await browser.close()

            /** If error, reject */
            if ((response?.status() ?? 0) >= 400)
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw { document: bodyHTML, status: response?.status() ?? 0 }

            return this.getItem(parseHTML(bodyHTML).document)
        } catch (error: any) {
            if (error?.document && error.status)
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw {
                    message: parseHTML(error.document).document?.querySelector('h1 + p')?.innerHTML?.trim() ?? 'An error occured',
                    code: error.status,
                } as IOutputError

            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw {
                message: 'An error occured',
                code: 500,
            } as IOutputError
        }
    }

    /**
     * Generate URL to be parsed
     * @returns Url
     */
    private generateUrl(): string {
        let url = `https://www.discogs.com/${this.lang}/`
        if (this.seller) {
            url += `seller/${this.seller}/`
            url += this.searchType === EType.USER ? 'mywants' : 'profile'
        } else {
            url += 'sell/'
            url += this.searchType === EType.USER ? 'mywants' : 'list'
        }
        return url
    }

    /**
     * Serialize params URL
     * @param params Object of GET parameters
     * @returns Url
     */
    // eslint-disable-next-line class-methods-use-this
    private serializeParams(params: any): string {
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
     * Function to convert devise to ISO name
     * @param str String to clean
     * @returns Cleanup string
     */
    // eslint-disable-next-line class-methods-use-this
    private convertDevise(value: string): string {
        if (!value)
            return value

        const currency: string = Object.keys(EDiscogsCurrencyToIsoCode).find(key => value.includes(key)) ?? ''

        if (!currency)
            return value

        return `${value.replace(currency, '')} ${(EDiscogsCurrencyToIsoCode as any)[currency]}`.replace(/\s\s+/g, ' ')
    }

    /**
     * Parse HTML to clean result
     * @param document Document to parse
     * @returns Items found
     */
    private getItem(document: Document): IOutputSuccess {
        const totalItems = parseFloat(
            document.querySelector('.pagination_total')?.textContent?.split(' ')?.filter((x: any) => x).pop()?.replace(/(,|\.|\s)/g, '') || '0',
        )

        return {
            items: [...document.querySelectorAll('table.table_block tbody tr')]?.map(el => {
                const shipping: any = this.convertDevise(
                    el.querySelector('.item_shipping')?.childNodes?.[0]?.textContent?.replace(/(\s+|\+)/g, ' ')?.trim()?.replace(',', '.') ?? '',
                )
                const have = Number.parseInt(el.querySelector('.community_summary .community_result:nth-child(1) .community_number')?.textContent ?? '', 10)
                const want = Number.parseInt(el.querySelector('.community_summary .community_result:nth-child(2) .community_number')?.textContent ?? '', 10)
                const countryName = el.querySelector('.seller_info li:nth-child(3)')?.textContent?.split(':')?.[1] ?? ''
                const isoCountryCode = (Object.keys(ECountryCode).find((key: string) => (ECountryName[key as ECountryCode] === countryName))
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
                    itemId: Number.isNaN(itemId) ? 0 : itemId,
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
                        base: this.convertDevise(el.querySelector('.price')?.textContent?.replace(/\s+/g, ' ')?.replace(/,/, '.') ?? ''),
                        shipping: Number.isNaN(parseFloat(shipping)) ? null : shipping,
                    },
                    from: {
                        countryName,
                        isoCountryName: ECountryName[isoCountryCode] ?? '',
                        isoCountryCode,
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
                current: this.page,
                total: Math.ceil(totalItems / this.limit),
            },
            result: {
                total: totalItems,
                perPage: this.limit,
            },
            search: {
                value: this.searchValue ?? '',
                type: this.searchType,
            },
            urlGenerated: this.url,
        }
    }
}
