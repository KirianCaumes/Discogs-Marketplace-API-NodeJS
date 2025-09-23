/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Country from 'data/country.data'
import { DEFAULT_SORT, DEFAULT_LIMIT, DEFAULT_PAGE } from 'search'
import type { CurrencyValues } from 'data/currency.data'
import type { CountryKeys } from 'data/country.data'
import type SearchResult from 'interfaces/search-result.interface'
import type ShopResultApi from 'interfaces/api/shop-result.api.interface'
import type ShopDetailsResultApi from 'interfaces/api/shop-details-result.api.interface'
import type { SearchParamsModern } from 'interfaces/search-params.interface'

/**
 * Parses the page and returns the items found.
 * @param SearchParams Search parameters
 * @returns Items found and total
 */
export default async function scrape({
    currencies,
    genres,
    formats,
    formatDescriptions,
    conditions,
    years,
    isMakeAnOfferOnly = false,
    from,
    sort = DEFAULT_SORT,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    releaseIds,
    sellerIds,
    artistIds,
    priceRange,
    sellerRatingMin = 0,
    includeGenericSleeves = true,
    includeSleevelessMedia = true,
    showUnavailable = true,
    sellerRatingCountMin = 0,
}: SearchParamsModern): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    const [sortType, sortOrder] = sort.split(',')

    const urlGenerated = [
        'https://www.discogs.com/api/shop-page-api/sell_item',
        new URLSearchParams(
            [
                ['sellerRatingMin', sellerRatingMin.toString()],
                ['includeGenericSleeves', includeGenericSleeves.toString()],
                ['includeSleevelessMedia', includeSleevelessMedia.toString()],
                ['showUnavailable', showUnavailable.toString()],
                ['sellerRatingCountMin', sellerRatingCountMin.toString()],
                [
                    'sort',
                    {
                        listed: 'listedDate',
                        condition: 'mediaCondition',
                        artist: 'artist',
                        title: 'title',
                        seller: 'seller',
                        price: 'price',
                    }[sortType!] ?? 'listedDate',
                ],
                [
                    'sortOrder',
                    {
                        asc: 'ascending',
                        desc: 'descending',
                    }[sortOrder!] ?? 'ascending',
                ],
                ['count', limit.toString()],
                ['offset', ((page - 1) * limit).toString()],
                ...(releaseIds?.map(r => ['release', r.toString()]) ?? []),
                ...(from?.map(f => Object.keys(Country).find(key => f === Country[key as CountryKeys]) ?? '') ?? []).map(f => [
                    'shipsFrom',
                    f,
                ]),
                ...(formats?.map(f => ['formatName', f]) ?? []),
                ...(formatDescriptions?.map(fd => ['formatDescription', fd]) ?? []),
                ...(conditions?.map(c => ['sleeveCondition', c]) ?? []),
                ...(conditions?.map(c => ['mediaCondition', c]) ?? []),
                ...(currencies?.map(c => ['currency', c]) ?? []),
                ...(genres?.map(g => ['genre', g]) ?? []),
                ...(sellerIds?.map(s => ['seller', s.toString()]) ?? []),
                ...(artistIds?.map(a => ['artist', a.toString()]) ?? []),
                ['allowsOffers', isMakeAnOfferOnly ? 'true' : ''],
                ['yearRangeLow', years?.min.toString() ?? ''],
                ['yearRangeHigh', years?.max.toString() ?? ''],
                ['priceRangeLow', priceRange?.min.toString() ?? ''],
                ['priceRangeHigh', priceRange?.max.toString() ?? ''],
            ].filter(([, p]) => !!p),
        ).toString(),
    ].join('?')

    const response = await globalThis.fetch(urlGenerated, {
        method: 'GET',
        headers: {
            'User-Agent': 'Discogs',
            'Content-Type': 'application/json',
        },
        referrer: 'https://discogs.com',
    })

    if (!response.ok) {
        throw new Error(response.statusText || `An error ${response.status} occurred.`)
    }

    const result = (await response.json()) as ShopResultApi

    const detailsResponse = await globalThis.fetch('https://www.discogs.com/graphql', {
        method: 'POST',
        headers: {
            'User-Agent': 'Discogs',
            'Content-Type': 'application/json',
        },
        referrer: 'https://discogs.com',
        body: JSON.stringify({
            // eslint-disable-next-line max-len
            query: 'query Releases($discogsIds: [Int], $first: Int) {\n  releases(discogsIds: $discogsIds) {\n    inWantlistCount\n    inCollectionCount\n    images(first: $first) {\n      edges {\n        node {\n          thumbnail {\n            webpUrl\n          }\n        }\n      }\n    }\n    ratings(first: 1) {\n      averageRating\n    }\n    discogsId\n  }\n}',
            variables: {
                discogsIds: result.items?.map(z => z.release?.releaseId ?? 0).filter((x, i, self) => x && self.indexOf(x) === i),
                first: 1,
            },
            extensions: {
                persistedQuery: {
                    version: 1,
                    sha256Hash: 'ee9d48441023ebd1e6ca169e550581b45de216e88b40711acb6617e49e1bb0cb',
                },
            },
        }),
    })

    if (!detailsResponse.ok) {
        throw new Error(detailsResponse.statusText || `An error ${detailsResponse.status} occurred.`)
    }

    const detailsResult = (await detailsResponse.json()) as ShopDetailsResultApi

    const details = Object.fromEntries(
        detailsResult.data?.releases?.map(release => [
            release.discogsId ?? 0,
            {
                imageUrl: release.images?.edges?.[0]?.node?.thumbnail?.webpUrl ?? null,
                want: release.inWantlistCount ?? 0,
                have: release.inCollectionCount ?? 0,
            },
        ]) ?? [],
    )

    const items =
        result.items?.map(item => {
            const detail = details[item.release?.releaseId ?? 0]
            return {
                id: item.itemId!,
                title: `${item.release?.artists?.map(x => x.name ?? '').join(', ') ?? ''} - ${item.release?.title ?? ''} (${item.release?.majorFormat ?? ''})`,
                artists:
                    item.release?.artists?.map(x => ({
                        id: x.artistId ?? null,
                        name: x.name ?? '',
                        url: x.artistId ? `https://www.discogs.com/artist/${x.artistId}` : null,
                    })) ?? [],
                release: {
                    id: item.release?.releaseId ?? 0,
                    name: item.release?.title ?? '',
                    url: `https://www.discogs.com/release/${item.release?.releaseId ?? '0'}`,
                },
                formats: item.release?.formatNames ?? [],
                labels:
                    item.release?.labels?.map(x => ({
                        id: x.labelId ?? 0,
                        name: x.name ?? '',
                        url: `https://www.discogs.com/label/${x.labelId ?? '0'}`,
                    })) ?? [],
                url: `https://www.discogs.com/sell/item/${item.itemId!}`,
                listedAt: new Date(item.listedDate ?? ''),
                catnos: [],
                imageUrl: detail?.imageUrl ?? null,
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                description: item.comments || null,
                isAcceptingOffer: item.allowsOffers ?? false,
                isAvailable: true,
                condition: {
                    media: {
                        full: item.mediaCondition ?? '',
                        short: /\(([^)]+)\)/.exec(item.mediaCondition ?? '')?.[1] ?? '',
                    },
                    sleeve: {
                        full: item.sleeveCondition ?? null,
                        short: /\(([^)]+)\)/.exec(item.sleeveCondition ?? '')?.[1] ?? null,
                    },
                },
                seller: {
                    name: item.seller?.name ?? '',
                    url: `https://www.discogs.com/seller/${item.seller?.name ?? ''}/profile`,
                    score: item.seller?.rating ? `${item.seller.rating.toFixed(1)}%` : null,
                    notes: item.seller?.ratingCount ?? null,
                },
                price: {
                    base: `${
                        item.price?.currencyCode === 'JPY' ? (item.price.amount ?? 0) : ((item.price?.amount ?? 0).toFixed(2) as never)
                    } ${(item.price?.currencyCode ?? '') as CurrencyValues}`,
                    shipping: item.shipping
                        ? `${
                              item.price?.currencyCode === 'JPY'
                                  ? (item.shipping.shippingPrice ?? 0)
                                  : ((item.shipping.shippingPrice ?? 0).toFixed(2) as never)
                          } ${(item.price?.currencyCode ?? '') as CurrencyValues}`
                        : null,
                },
                country: {
                    name: item.seller?.shipsFrom ?? '',
                    code: Country[item.seller?.shipsFrom as CountryKeys],
                },
                community: {
                    have: detail?.have ?? 0,
                    want: detail?.want ?? 0,
                },
            } satisfies SearchResult['items'][0]
        }) ?? []

    return { total: result.totalCount ?? 0, items, urlGenerated }
}
