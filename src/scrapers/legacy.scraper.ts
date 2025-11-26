import Currency from 'data/currency.data'
import Country from 'data/country.data'
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT } from 'search'
import extractLegacy from 'scrapers/extractors/legacy.extractor'
import type { CountryKeys } from 'data/country.data'
import type SearchResult from 'interfaces/search-result.interface'
import type { SearchParamsLegacy } from 'interfaces/search-params.interface'
import type { BrowserContext } from 'playwright-chromium'

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
 * Parses the page and returns the items found.
 * @param url Url to scrape
 * @param browserContext Playwright browser context
 * @returns Items found and total
 */
export default async function scrapeLegacy(
    {
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
    }: SearchParamsLegacy,
    browserContext: BrowserContext,
): Promise<
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

    const browserPage = await browserContext.newPage()

    await browserPage.route('**/*', route => (route.request().resourceType() === 'document' ? route.continue() : route.abort()))

    // Inject some globals to the page, so we can use them in the scraping function
    await browserPage.addInitScript(g => Object.assign(globalThis, g), { Country, Currency })

    const response = await browserPage.goto(urlGenerated)

    // See current issue: https://github.com/evanw/esbuild/issues/2605
    await browserPage.evaluate(() => ((window as any).__name ??= (func: any) => func)) // eslint-disable-line

    if (!response?.ok()) {
        const errorMessage =
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            (await browserPage.evaluate(() => document.querySelector('h1 + p')?.innerHTML.trim())) ||
            `An error ${response?.status() ?? '?'} occurred.`

        await browserPage.close()

        throw new Error(errorMessage)
    }

    const { items, total } = await browserPage.evaluate(extractLegacy)

    await browserPage.close()

    return { total, items, urlGenerated }
}
