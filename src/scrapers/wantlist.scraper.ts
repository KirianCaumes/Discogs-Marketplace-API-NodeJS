import { parseHTML } from 'linkedom'
import scrape from 'scrapers/modern.scraper'
import type SearchResult from 'interfaces/search-result.interface'
import type { SearchParamsModern } from 'interfaces/search-params.interface'

const PER_PAGE = 250

/**
 * Parses the page and returns the items found.
 * @param searchParams Search parameters
 * @returns Items found and total
 */
export default async function scrapeWantlist(searchParams: SearchParamsModern): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    /** Fetch the first page of user wantlist */
    const firstPageResponse = await globalThis.fetch(
        `https://www.discogs.com/wantlist?${new URLSearchParams({
            page: '1',
            limit: PER_PAGE.toString(),
            user: searchParams.wantlist ?? '',
            layout: 'sm',
        }).toString()}`,
        {
            headers: { 'User-Agent': 'Discogs', 'Content-Type': 'application/json' },
            referrer: 'https://discogs.com',
        },
    )

    if (!firstPageResponse.ok && firstPageResponse.status !== 404) {
        throw new Error(firstPageResponse.statusText || `An error ${firstPageResponse.status} occurred.`)
    }

    const firstPage = await firstPageResponse.text()

    const { document: firstPageDocument } = parseHTML(firstPage)

    /** Total number of items in the wantlist  */
    const total = +(firstPageDocument.querySelector('.pagination_total')?.textContent?.split(' of ').pop()?.replace(',', '') ?? '0')

    const wants = await Promise.all(
        new Array(Math.ceil(total / PER_PAGE)).fill({}).map(async (_, i) => {
            const page = i + 1
            const result =
                page === 1
                    ? firstPage
                    : (
                          await globalThis.fetch(
                              `https://www.discogs.com/wantlist?${new URLSearchParams({
                                  page: page.toString(),
                                  limit: PER_PAGE.toString(),
                                  user: searchParams.wantlist ?? '',
                                  layout: 'sm',
                              }).toString()}`,
                              {
                                  headers: { 'User-Agent': 'Discogs', 'Content-Type': 'application/json' },
                                  referrer: 'https://discogs.com',
                              },
                          )
                      ).text()

            const { document } = parseHTML(result)
            /** Extract the links to the items in the wantlist, if there's no link it's not for sale */
            const links = [...document.querySelectorAll<HTMLLinkElement>('.marketplace_for_sale_count a')]
            return links.map(x => +(new URL(`https://discogs.com${x.href}`).pathname.split('/').pop() ?? '0'))
        }),
    )

    const wantlistIds = wants.flat()

    // If there's nothing for sale
    if (wantlistIds.length === 0) {
        return scrape({ ...searchParams, releaseIds: [0], wantlist: undefined })
    }

    return scrape({ ...searchParams, releaseIds: wantlistIds, wantlist: undefined })
}
