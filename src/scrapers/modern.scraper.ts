/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Country from 'data/country.data'
import type { CurrencyValues } from 'data/currency.data'
import type { CountryKeys } from 'data/country.data'
import type SearchResult from 'interfaces/search-result.interface'
import type ShopResultApi from 'interfaces/api/shop-result.api.interface'
import type ShopDetailsResultApi from 'interfaces/api/shop-details-result.api.interface'
import type { SearchParamsDefaulted } from 'interfaces/search-params.interface'

/**
 * Parses the page and returns the items found.
 * @param SearchParams Search parameters
 * @returns Items found and total
 */
export default async function scrape({
    currency,
    genre,
    format,
    formatDescription,
    condition,
    years,
    isMakeAnOfferOnly,
    from,
    // Seller,
    sort,
    limit,
    page,
    releases,
}: SearchParamsDefaulted & {
    /** Releases */
    releases?: Array<number>
}): Promise<
    Pick<SearchResult, 'items' | 'urlGenerated'> & {
        /** Total items found */
        total: SearchResult['result']['total']
    }
> {
    const urlGenerated = [
        'https://www.discogs.com/api/shop-page-api/sell_item',
        new URLSearchParams(
            [
                ['sellerRatingMin', '0'],
                ['includeGenericSleeves', 'true'],
                ['includeSleevelessMedia', 'true'],
                ['showUnavailable', 'true'],
                ['sellerRatingCountMin', '0'],
                [
                    'sort',
                    {
                        listed: 'listedDate',
                        condition: 'mediaCondition',
                        artist: 'artist',
                        title: 'title',
                        seller: 'seller',
                        price: 'price',
                    }[sort.split(',').at(0)!] ?? 'listedDate',
                ],
                [
                    'sortOrder',
                    {
                        asc: 'ascending',
                        desc: 'descending',
                    }[sort.split(',').at(-1)!] ?? 'ascending',
                ],
                ['count', limit.toString()],
                ['offset', ((page - 1) * limit).toString()],
                ...(releases?.map(r => ['release', r.toString()]) ?? []),
                ['shipsFrom', Object.keys(Country).find(key => Country[key as CountryKeys] === from)!],
                ...(format?.map(f => ['formatName', f]) ?? []),
                ...(formatDescription?.map(fd => ['formatDescription', fd]) ?? []),
                ...(condition?.map(fd => ['sleeveCondition', fd]) ?? []),
                ...(condition?.map(fd => ['mediaCondition', fd]) ?? []),
                ['allowsOffers', isMakeAnOfferOnly ? 'true' : ''],
                ['currency', currency ?? ''],
                ['genre', genre ?? ''],
                ['yearRangeLow', years?.min.toString() ?? ''],
                ['yearRangeHigh', years?.max.toString() ?? ''],
            ].filter(([, p]) => !!p),
        ).toString(),
    ].join('?')

    const result = (await (
        await globalThis.fetch(urlGenerated, {
            method: 'GET',
            headers: {
                'User-Agent': 'Discogs',
                'Content-Type': 'application/json',
            },
            referrer: 'https://discogs.com',
        })
    ).json()) as ShopResultApi

    const detailsResult = (await (
        await globalThis.fetch('https://www.discogs.com/graphql', {
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
    ).json()) as ShopDetailsResultApi

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

    const items = (result.items?.map(item => {
        const detail = details[item.release?.releaseId ?? 0]
        return {
            id: item.itemId!,
            title: {
                // eslint-disable-next-line max-len
                original: `${item.release?.artists?.map(x => x.name ?? '').join(', ') ?? ''} - ${item.release?.title ?? ''} (${item.release?.majorFormat ?? ''})`,
                artist: item.release?.artists?.map(x => x.name ?? '').join(', ') ?? '',
                item: item.release?.title ?? '',
                formats: item.release?.formatNames ?? [],
            },
            url: `https://www.discogs.com/sell/item/${item.itemId!}`,
            listedAt: new Date(item.listedDate ?? ''),
            labels: item.release?.labels?.map(x => x.name ?? '').filter((value, index, self) => self.indexOf(value) === index) ?? [],
            catnos: [],
            imageUrl: detail?.imageUrl ?? '',
            description: item.comments ?? '',
            isAcceptingOffer: item.allowsOffers ?? false,
            isAvailable: true,
            condition: {
                media: {
                    full: item.mediaCondition ?? '',
                    short: /\(([^)]+)\)/.exec(item.mediaCondition ?? '')?.[1] ?? '',
                },
                sleeve: {
                    full: item.sleeveCondition ?? '',
                    short: /\(([^)]+)\)/.exec(item.sleeveCondition ?? '')?.[1] ?? '',
                },
            },
            seller: {
                name: item.seller?.name ?? '',
                url: `https://www.discogs.com/seller/${item.seller?.name ?? ''}/profile`,
                score: item.seller?.rating?.toString() ?? '0',
                notes: item.seller?.ratingCount ?? 0,
            },
            price: {
                base: `${item.price?.amount ?? 0} ${(item.price?.currencyCode ?? '') as CurrencyValues}`,
                shipping: item.shipping ? `${item.shipping.shippingPrice ?? 0} ${(item.price?.currencyCode ?? '') as CurrencyValues}` : '',
            },
            country: {
                name: item.seller?.shipsFrom ?? '',
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                code: Country[item.seller?.shipsFrom as CountryKeys] ?? '',
            },
            community: {
                have: detail?.have ?? 0,
                want: detail?.want ?? 0,
            },
            release: {
                id: item.release?.releaseId ?? 0,
                url: `https://www.discogs.com/release/${item.release?.releaseId ?? ''}`,
            },
        }
    }) ?? []) satisfies SearchResult['items']

    return { total: result.totalCount ?? 0, items, urlGenerated }
}
