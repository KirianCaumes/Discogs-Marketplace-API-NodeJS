import Country from 'data/country.data'
import Style from 'data/style.data'
import type { CountryKeys } from 'data/country.data'
import type { StyleKeys } from 'data/style.data'
import type { Currency } from 'types/currency.type'
import type { SearchParams } from 'interfaces/search-params.interface'
import type SearchResult from 'interfaces/search-result.interface'
import type MarketplaceSearchResultApi from 'interfaces/api/marketplace-search-result.api.interface'
import type ReleasesResultApi from 'interfaces/api/releases-result.api.interface'
import type { BrowserContext, Page } from 'patchright'

/** Hashes of the persisted GraphQL queries of the Discogs shop */
const HASHES = {
    MarketplaceSearch: '7ce2bd7801f216b0999648d626c935fc86c8fd85e562529bd87b690c974f08c2',
    Releases: 'ee9d48441023ebd1e6ca169e550581b45de216e88b40711acb6617e49e1bb0cb',
}

/** Sort dimensions of the Discogs shop */
const SORT_DIMENSIONS: Record<string, string> = {
    listed: 'LISTED_DATE',
    condition: 'MEDIA_CONDITION',
    sleeveCondition: 'SLEEVE_CONDITION',
    artist: 'ARTIST',
    title: 'TITLE',
    year: 'YEAR',
    releaseCountry: 'COUNTRY',
    seller: 'SELLER',
    sellerRating: 'SELLER_RATING',
    sellerRatingCount: 'SELLER_RATING_COUNT',
    shipsFrom: 'SHIPS_FROM',
    price: 'PRICE',
}

/** Sort slugs of the Discogs shop url, which does not offer every sort of its API */
const SORT_SLUGS: Record<string, string> = {
    listed: 'date-listed',
    condition: 'media-condition',
    artist: 'artist',
    title: 'title',
    seller: 'seller',
    price: 'price',
}

/** Conditions as returned by the API, to the labels used everywhere else */
const CONDITIONS: Record<string, string> = {
    MINT: 'Mint (M)',
    NEAR_MINT: 'Near Mint (NM or M-)',
    VERY_GOOD_PLUS: 'Very Good Plus (VG+)',
    VERY_GOOD: 'Very Good (VG)',
    GOOD_PLUS: 'Good Plus (G+)',
    GOOD: 'Good (G)',
    FAIR: 'Fair (F)',
    POOR: 'Poor (P)',
    GENERIC: 'Generic',
    NOT_GRADED: 'Not Graded',
    NO_COVER: 'No Cover',
}

/**
 * Run a GraphQL query of the Discogs shop from the page, which must be on the Discogs origin.
 * @param page Page
 * @param operationName Name of the persisted query
 * @param variables Variables
 * @returns Response
 */
async function queryGraphql<T extends MarketplaceSearchResultApi | ReleasesResultApi>(
    page: Page,
    operationName: keyof typeof HASHES,
    variables: object,
): Promise<T> {
    const { status, json } = await page.evaluate(
        async body => {
            const res = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            return { status: res.status, json: (await res.json().catch(() => null)) as unknown }
        },
        { operationName, variables, extensions: { persistedQuery: { version: 1, sha256Hash: HASHES[operationName] } } },
    )

    const result = json as T | null

    if (!result?.data) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        throw new Error(result?.errors?.map(x => x.message).join(', ') || `An error ${status} occurred.`)
    }

    return result
}

/**
 * Format a price as a string combining amount and currency
 * @param price Price
 * @param price.amount Amount
 * @param price.currency Currency
 * @returns Price
 */
function formatPrice(price?: {
    /** Amount */
    amount?: number
    /** Currency */
    currency?: string
}): `${number} ${Currency}` {
    return `${price?.currency === 'JPY' ? (price.amount ?? 0) : ((price?.amount ?? 0).toFixed(2) as never)} ${price?.currency ?? ''}`
}

/**
 * Get a condition from the value returned by the API
 * @param value Value
 * @returns Condition
 */
function toCondition(value?: string | null): {
    /** Full description */
    full: string | null
    /** Short code */
    short: string | null
} {
    const full = value ? (CONDITIONS[value] ?? value) : null

    return { full, short: /\(([^)]+)\)/.exec(full ?? '')?.[1] ?? null }
}

/** HTML entities the notes of the sellers can hold, besides the numeric ones */
const HTML_ENTITIES: Record<string, string> = { quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0' } // cspell: disable-line

/**
 * Decode the HTML entities of a text, as the notes of the sellers come HTML escaped
 * @param text Text
 * @returns Decoded text
 */
function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
        .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
        .replace(new RegExp(`&(${Object.keys(HTML_ENTITIES).join('|')});`, 'g'), (_, name: string) => HTML_ENTITIES[name] ?? '')
        .replace(/&amp;/g, '&')
}

/**
 * Searches the listings through the `MarketplaceSearch` GraphQL query of the Discogs shop.
 * @param searchParams Search parameters
 * @param browserContext Patchright browser context
 * @returns Items found, total, next cursor and url of the same search on Discogs
 */
export default async function scrapeMarketplace(
    {
        query,
        artistIds,
        labelIds,
        masterIds,
        releaseIds,
        sellerIds,
        genres,
        styles,
        formats,
        formatDescriptions,
        mediaConditions,
        sleeveConditions,
        from,
        currencies,
        priceRange,
        sellerRatingMin,
        sellerRatingCountMin,
        years,
        isMakeAnOfferOnly = false,
        hasItemPhotos = false,
        hideGenericSleeves = false,
        hideSleevelessMedia = false,
        showUnavailable = true,
        sort = 'listed,desc',
        limit = 25,
        after,
    }: SearchParams,
    browserContext: BrowserContext,
): Promise<SearchResult> {
    const [sortField = 'listed', sortOrder = 'desc'] = sort.split(',')

    const countries = from?.flatMap(code => {
        const names = Object.keys(Country).filter(key => code === Country[key as CountryKeys])
        return names.length ? names : [code]
    })

    const styleIds =
        styles?.flatMap(name => {
            const ids = Style[name as StyleKeys] as ReadonlyArray<string> | undefined
            return ids ? [ids] : []
        }) ?? []

    /** Url of the same search on the Discogs shop */
    const urlGenerated = [
        'https://www.discogs.com/shop/list',
        new URLSearchParams(
            [
                ['q', query ?? ''],
                ...(artistIds?.map(x => ['artist', x.toString()]) ?? []),
                ...(labelIds?.map(x => ['label', x.toString()]) ?? []),
                ...(masterIds?.map(x => ['master', x.toString()]) ?? []),
                ...(releaseIds?.map(x => ['release', x.toString()]) ?? []),
                ...(sellerIds?.map(x => ['seller', x.toString()]) ?? []),
                ...(genres?.map(x => ['genre', x]) ?? []),
                ...(styles?.map(x => ['style', x]) ?? []),
                ...(formats?.map(x => ['formatName', x]) ?? []),
                ...(formatDescriptions?.map(x => ['formatDescription', x]) ?? []),
                ...(mediaConditions?.map(x => ['mediaCondition', x]) ?? []),
                ...(sleeveConditions?.map(x => ['sleeveCondition', x]) ?? []),
                ...(countries?.map(x => ['shipsFrom', x]) ?? []),
                ['priceMin', priceRange?.min.toString() ?? ''],
                ['priceMax', priceRange?.max.toString() ?? ''],
                ['year', years?.min.toString() ?? ''],
                ['year', years?.max.toString() ?? ''],
                ['allowsOffers', isMakeAnOfferOnly ? 'true' : ''],
                ['hasItemPhotos', hasItemPhotos ? 'true' : ''],
                ['hideGenericSleeves', hideGenericSleeves ? 'true' : ''],
                ['hideSleevelessMedia', hideSleevelessMedia ? 'true' : ''],
                ['showUnavailable', showUnavailable ? 'true' : ''],
                ...(SORT_SLUGS[sortField]
                    ? [
                          ['sort', SORT_SLUGS[sortField]],
                          ['sortOrder', sortOrder === 'asc' ? 'ascending' : 'descending'],
                      ]
                    : []),
                ['size', limit.toString()],
                ['after', after ?? ''],
            ].filter(([, x]) => !!x),
        ).toString(),
    ].join('?')

    const browserPage = await browserContext.newPage()

    try {
        // The API can only be called from the Discogs origin: go there through its lightest page
        await browserPage.goto('https://www.discogs.com/robots.txt', { waitUntil: 'commit' })

        const filter = Object.fromEntries(
            Object.entries({
                artist: artistIds,
                label: labelIds,
                master: masterIds,
                release: releaseIds,
                seller: sellerIds,
                genre: genres,
                genreAnd: genres?.length ? true : undefined,
                styleId: styleIds.length ? [...new Set(styleIds.flat())] : undefined,
                styleIdAnd: styleIds.length ? styleIds.every(x => x.length === 1) : undefined,
                formatName: formats,
                formatNameAnd: formats?.length ? true : undefined,
                formatDescription: formatDescriptions,
                formatDescriptionAnd: formatDescriptions?.length ? true : undefined,
                mediaCondition: mediaConditions,
                sleeveCondition: sleeveConditions,
                shipsFrom: countries,
                currency: currencies,
                sellerRatingMin,
                sellerRatingCountMin,
                priceRangeLow: priceRange?.min,
                priceRangeHigh: priceRange?.max,
                yearRangeLow: years?.min,
                yearRangeHigh: years?.max,
                allowsOffers: isMakeAnOfferOnly || undefined,
                hasInventoryImages: hasItemPhotos || undefined,
                hideGenericSleeves: hideGenericSleeves || undefined,
                hideSleevelessMedia: hideSleevelessMedia || undefined,
                showUnavailable: showUnavailable || undefined,
            }).filter(([, x]) => x !== undefined && !(Array.isArray(x) && !x.length)),
        )

        const result = (
            await queryGraphql<MarketplaceSearchResultApi>(browserPage, 'MarketplaceSearch', {
                query: query || undefined, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
                filter: Object.keys(filter).length ? filter : undefined,
                sort: {
                    dimension: SORT_DIMENSIONS[sortField] ?? SORT_DIMENSIONS.listed,
                    direction: sortOrder === 'asc' ? 'ASCENDING' : 'DESCENDING',
                },
                first: limit,
                after,
            })
        ).data?.marketplaceSearch

        const nodes = result?.edges?.map(x => x.node ?? {}) ?? []

        const releaseIdsFound = [...new Set(nodes.map(x => x.release?.discogsId ?? 0).filter(x => !!x))]
        const { data: details } = releaseIdsFound.length
            ? // The community stats and the rating of the releases are not part of the listings
              await queryGraphql<ReleasesResultApi>(browserPage, 'Releases', { discogsIds: releaseIdsFound, first: 1 })
            : { data: undefined }
        const releaseDetails = new Map(details?.releases?.map(x => [x?.discogsId ?? 0, x]) ?? [])

        const items = nodes.map(node => {
            const release = node.release ?? {}
            const artists = release.primaryArtists ?? []
            const labels = (release.labels ?? []).filter(x => x.labelRole === 'LABEL')
            const description = release.formatSummary?.description
            const media = toCondition(node.mediaCondition)
            const releaseDetail = releaseDetails.get(release.discogsId ?? 0)
            const year = Number(release.released?.slice(0, 4))

            return {
                id: Number(node.id),
                title: `${artists.map(x => x.displayName ?? '').join(', ')} - ${release.title ?? ''} (${release.formatSummary?.primaryFormat ?? ''})`,
                artists: artists.map(x => ({
                    id: x.artist?.discogsId ?? null,
                    name: x.displayName ?? '',
                    url: x.artist?.discogsId ? `https://www.discogs.com/artist/${x.artist.discogsId}` : null,
                })),
                release: {
                    id: release.discogsId ?? 0,
                    name: release.title ?? '',
                    url: `https://www.discogs.com/release/${release.discogsId ?? 0}`,
                    year: year || null,
                    country: release.country ?? null,
                    rating: releaseDetail?.ratings?.averageRating || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
                },
                formats: [
                    ...new Set(
                        [
                            release.formatSummary?.primaryFormat,
                            ...(release.formatSummary?.recordingTypes ?? []),
                            ...(Array.isArray(description) ? description : (description?.split(', ') ?? [])),
                        ].filter((x): x is string => !!x),
                    ),
                ],
                labels: labels.map(x => ({
                    id: x.label?.discogsId ?? 0,
                    name: x.label?.name ?? '',
                    url: `https://www.discogs.com/label/${x.label?.discogsId ?? 0}`,
                })),
                url: `https://www.discogs.com/shop/item/${node.id ?? ''}`,
                listedAt: node.listedDate ? new Date(node.listedDate) : null,
                catnos: labels.map(x => x.catalogNumber ?? '').filter(x => !!x),
                imageUrl: release.images?.edges?.[0]?.node?.thumbnail?.webpUrl ?? null,
                photos: [...(node.itemPhotos ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)).map(x => x.url ?? ''),
                description: node.publicNotes ? decodeHtmlEntities(node.publicNotes) : null,
                isAcceptingOffer: node.offerOk ?? false,
                isAvailable: node.availability?.isAvailable ?? true,
                condition: {
                    media: { full: media.full ?? '', short: media.short ?? '' },
                    sleeve: toCondition(node.sleeveCondition),
                },
                seller: {
                    id: node.seller?.discogsId ?? 0,
                    name: node.seller?.username ?? '',
                    url: `https://www.discogs.com/seller/${node.seller?.username ?? ''}/profile`,
                    score: node.sellerInfo?.rating ? `${node.sellerInfo.rating.toFixed(1)}%` : null,
                    notes: node.sellerInfo?.ratingCount ?? null,
                    isIndependent: node.sellerInfo?.independentSeller ?? false,
                },
                price: {
                    base: formatPrice(node.price),
                    shipping: node.shipping?.price ? formatPrice(node.shipping.price) : null,
                },
                country: {
                    name: node.sellerInfo?.shipsFrom ?? '',
                    code: Country[node.sellerInfo?.shipsFrom as CountryKeys],
                },
                community: {
                    have: releaseDetail?.inCollectionCount ?? 0,
                    want: releaseDetail?.inWantlistCount ?? 0,
                },
            } satisfies SearchResult['items'][0]
        })

        return {
            items,
            total: result?.totalCount ?? 0,
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            nextCursor: (result?.pageInfo?.hasNextPage && result.pageInfo.endCursor) || null,
            urlGenerated,
        }
    } finally {
        await browserPage.close()
    }
}
