import { ECurrency } from '@enum/ECurrency'
import { EFormat } from '@enum/EFormat'
import { EFormatDescription } from '@enum/EFormatDescription'
import { EFrom } from '@enum/EFrom'
import { EFromIso } from '@enum/EFromIso'
import { EGenre } from '@enum/EGenre'
import { ELang } from '@enum/ELang'
import { EMediaCondition } from '@enum/EMediaCondition'
import { ESort } from '@enum/ESort'
import { EStyle } from '@enum/EStyle'
import { EType } from '@enum/EType'
import IInput from '@interface/IInput'
import IOutputError from '@interface/IOutputError'
import IOutputSuccess from '@interface/IOutputSuccess'
import IYears from '@interface/IYears'
import { TLimit } from '@type/TLimit'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import UserAgent from 'user-agents'

/**
 * Discogs Marketplace 
 * @class
 * @implements {IInput}
 */
export default class Marketplace implements IInput {
    searchType: EType
    searchValue: string | number | undefined
    currency?: ECurrency
    genre?: EGenre
    style?: EStyle[]
    format?: EFormat[]
    formatDescription?: EFormatDescription[]
    mediaCondition?: EMediaCondition[]
    year?: number
    years?: IYears
    isAudioSample: boolean
    isMakeAnOfferOnly: boolean
    from?: EFrom
    seller?: string
    sort: ESort
    limit: TLimit
    page: number
    lang: ELang

    /**
     * Url generated by Puppetter
     */
    url: string | null

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
        lang = ELang.ENGLISH
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

        this.url = null
    }

    /**
     * Search elements on discogs
     * @returns {Promise<IOutputSuccess>} Items found
     */
    public async search(): Promise<IOutputSuccess> {
        return await new Promise(async (resolve, reject) => {
            /** Init browser */
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
            const page = await browser.newPage()

            /** Block useless ressources */
            await page.setRequestInterception(true)
            page.on('request', (req) => {
                ['stylesheet', 'image', 'media', 'font', 'script', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other'].includes(req.resourceType()) ? req.abort() : req.continue()
            })

            /** Init user agent */
            await page.setUserAgent((new UserAgent()).toString())

            /** Init page */
            const response = await page.goto(
                `${this._generateUrl()}?${this._serializeParams({
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
                })}`
            )

            /** Get url */
            this.url = page.url()

            /** Get HTML */
            const bodyHTML = await page.evaluate(() => document.body.innerHTML)

            /** Close browser */
            await browser.close()

            /** If error, reject */
            if (response?.headers()?.status && parseInt(response?.headers()?.status) >= 400) reject({ document: bodyHTML, status: response?.headers()?.status })

            /** resolve */
            resolve({ document: bodyHTML })
        })
            .then((res: any) => {
                let result: IOutputSuccess = this._format((new JSDOM(res.document)).window.document)
                return result
            })
            .catch((err: any) => {
                const { document } = (new JSDOM(err.document)).window
                let result: IOutputError = {
                    message: document.querySelector('h1 + p')?.innerHTML?.trim() ?? 'An error occured',
                    code: err.status
                }
                throw result
            })
    }

    /**
     * Generate URL to be parsed
     * @returns {string} Url
     */
    private _generateUrl(): string {
        let url = `https://www.discogs.com/${this.lang}/`
        if (this.seller) {
            url += `seller/${this.seller}/`
            url += this.searchType === EType.USER ? `mywants` : 'profile'
        } else {
            url += `sell/`
            url += this.searchType === EType.USER ? `mywants` : `list`
        }
        return url
    }

    /**
     * Serialize params URL
     * @param {any} params Object of GET parameters
     * @returns {string} Url
     */
    private _serializeParams(params: any): string {
        let param: string[] = []
        for (let key in params) {
            if (params[key] === undefined || params[key] === null) {
                continue
            } else if (Array.isArray(params[key])) {
                /** Custom handle for array */
                if (params[key].length > 0) {
                    for (const el of params[key]) {
                        param.push(key + "=" + encodeURIComponent(el))
                    }
                } else {
                    continue
                }
            } else {
                param.push(key + "=" + encodeURIComponent(params[key]))
            }
        }
        return param.join('&')
    }

    /**
     * Function to convert devise to ISO name
     * @param str String to clean
     * @returns {string} Cleanup string
     */
    private _convertDevise(str: string): string {
        if (!str) return str
        const data: any = {
            "\$US": "USD",
            "£GB": "GBP",
            "\$CA": "CAD",
            "\$AU": "AUD",
            "JPY": "JPY",
            "CHF": "CHF",
            "MX\$": "MXN",
            "\$NZ": "NZD",
            "SEK": "SEK",
            "ZAR": "ZAR",
            "CA\$": "AUD",
            "A\$": "AUD",
            "R\$": "BRL",
            "€": "EUR",
            "\$": "USD",
            "£": "GBP",
            "¥": "JPY",
        }
        Object.keys(data).forEach(x => {
            if (str.includes(`${x}`)) {
                str = str.replace(`${x}`, '')
                str = `${str} ${data[x]}`.replace(/\s\s+/g, ' ') //Replace multiple space by one
            }
        })
        return str
    }

    /**
     * Parse HTML to clean result
     * @param {Document} document Document to parse 
     * @returns {IOutputSuccess} Items found
     */
    private _format(document: Document): IOutputSuccess {
        let totalItems: any = document.querySelector('.pagination_total')?.textContent?.split(' ')?.filter((x: any) => x)
        totalItems = parseFloat(totalItems?.[totalItems?.length - 1]?.replace(/(\,|\.|\s)/g, '')) || 0

        return {
            result: [...document.querySelectorAll('table.table_block tbody tr')]?.map(el => {
                const shipping: any = this._convertDevise(el.querySelector('.item_shipping')?.childNodes?.[0]?.textContent?.replace(/(\s+|\+)/g, " ")?.trim()?.replace(',', '.')!)
                const have: number = parseInt(el.querySelector('.community_summary .community_result:nth-child(1) .community_number')?.textContent!)
                const want: number = parseInt(el.querySelector('.community_summary .community_result:nth-child(2) .community_number')?.textContent!)
                const country:any = el.querySelector('.seller_info li:nth-child(3)')?.textContent?.split(':')?.[1]

                return {
                    title: el.querySelector('.item_description_title')?.textContent,
                    url: `https://www.discogs.com${(<HTMLLinkElement>el.querySelector('a.item_description_title'))?.href}`,
                    labels: [...new Set([...el.querySelectorAll(".label_and_cat a[href^='https://www.discogs.com/']")]?.map(x => x?.textContent))],
                    catnos: el.querySelector('.label_and_cat .item_catno')?.textContent?.replace(/\s+/g, " ")?.split(', ')?.filter(x => x !== 'none'),
                    imageUrl: el.querySelector('.marketplace_image')?.getAttribute('data-src'),
                    description: el.querySelector('.item_description > p.hide_mobile:not(.label_and_cat)')?.textContent?.replace(/\s+/g, " ")?.trim(),
                    isAcceptingOffer: el.querySelector('.item_add_to_cart p a strong')?.textContent?.split("/")?.length! > 1,
                    isAvailable: !el.classList?.contains('unavailable'),
                    condition: {
                        media: {
                            full: el.querySelector('.item_condition span:nth-child(3)')?.textContent?.replace(/\s+/g, " ")?.trim(),
                            short: el.querySelector('.item_condition span:nth-child(3)')?.textContent?.replace(/\s+/g, " ")?.trim()?.match(/\(([^)]+)\)/)?.[1]
                        },
                        sleeve: {
                            full: el.querySelector('.item_condition span.item_sleeve_condition')?.textContent,
                            short: el.querySelector('.item_condition span.item_sleeve_condition')?.textContent?.match(/\(([^)]+)\)/)?.[1]
                        }
                    },
                    seller: {
                        name: el.querySelector('.seller_info a')?.textContent,
                        score: el.querySelector('.seller_info li:nth-child(2) strong')?.textContent,
                        notes: el.querySelector('.seller_info li:nth-child(2) .section_link')?.textContent?.replace(/\s+/g, " ")?.trim()?.split(' ')?.[0]
                    },
                    price: {
                        base: this._convertDevise(el.querySelector('.price')?.textContent?.replace(/\s+/g, " ")?.replace(/,/, '.')!),
                        shipping: isNaN(parseFloat(shipping)) ? null : shipping,
                        from: country,
                        isoFrom: (EFromIso as any)[country] ?? country ?? ""                        
                    },
                    community: {
                        have: isNaN(have) ? null : have,
                        want: isNaN(want) ? null : want
                    },
                    release_url: `https://www.discogs.com${(<HTMLLinkElement>el.querySelector('a.item_release_link'))?.href}`
                }
            }) || [],
            page: {
                current: this.page,
                total: Math.ceil(totalItems / this.limit)
            },
            item: {
                total: totalItems,
                per_page: this.limit,
            },
            search: {
                value: this.searchValue,
                type: this.searchType
            },
            url_generated: this.url
        }
    }
}