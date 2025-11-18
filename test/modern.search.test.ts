import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { DiscogsMarketplace } from '../src/index'

void describe('Test modern search functionality (v2 API)', () => {
    void test('It should return success value with basic search', async () => {
        const res = await DiscogsMarketplace.search({ api: 'v2' })

        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
        assert.ok(res.items.length > 0)
        assert.notStrictEqual(res.items[0]?.id, undefined)
        assert.notStrictEqual(res.items[0]?.title, undefined)
        assert.notStrictEqual(res.items[0]?.artists, undefined)
        assert.notStrictEqual(res.items[0]?.release, undefined)
        assert.notStrictEqual(res.items[0]?.formats, undefined)
        assert.ok((res.items[0]?.formats.length ?? 0) >= 0)
        assert.notStrictEqual(res.items[0]?.url, undefined)
        assert.notStrictEqual(res.items[0]?.listedAt, undefined)
        assert.notStrictEqual(res.items[0]?.labels, undefined)
        assert.notStrictEqual(res.items[0]?.catnos, undefined)
        assert.notStrictEqual(res.items[0]?.imageUrl, undefined)
        assert.notStrictEqual(res.items[0]?.description, undefined)
        assert.notStrictEqual(res.items[0]?.isAcceptingOffer, undefined)
        assert.notStrictEqual(res.items[0]?.isAvailable, undefined)
        assert.notStrictEqual(res.items[0]?.condition.media, undefined)
        assert.notStrictEqual(res.items[0]?.condition.media.full, undefined)
        assert.notStrictEqual(res.items[0]?.condition.media.short, undefined)
        assert.notStrictEqual(res.items[0]?.condition.sleeve, undefined)
        assert.notStrictEqual(res.items[0]?.condition.sleeve.full, undefined)
        assert.notStrictEqual(res.items[0]?.condition.sleeve.short, undefined)
        assert.notStrictEqual(res.items[0]?.seller.name, undefined)
        assert.notStrictEqual(res.items[0]?.seller.url, undefined)
        assert.notStrictEqual(res.items[0]?.seller.notes, undefined)
        assert.notStrictEqual(res.items[0]?.seller.score, undefined)
        assert.notStrictEqual(res.items[0]?.price.base, undefined)
        assert.notStrictEqual(res.items[0]?.price.shipping, undefined)
        assert.notStrictEqual(res.items[0]?.country.name, undefined)
        assert.notStrictEqual(res.items[0]?.country.code, undefined)
        assert.notStrictEqual(res.items[0]?.community.have, undefined)
        assert.notStrictEqual(res.items[0]?.community.want, undefined)
        assert.notStrictEqual(res.items[0]?.release.url, undefined)
        assert.notStrictEqual(res.items[0]?.release.id, undefined)
    })

    void test('It should generate correct URL parameters with complex search', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            currencies: ['EUR'],
            genres: ['Rock'],
            formats: ['CD'],
            formatDescriptions: ['Promo'],
            conditions: ['Mint (M)'],
            years: {
                min: 2019,
                max: 2025,
            },
            isMakeAnOfferOnly: true,
            from: ['FR'],
            sort: 'listed,desc',
            limit: 50,
            page: 2,
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.notStrictEqual(params, null)
        assert.strictEqual(params.currency, 'EUR')
        assert.strictEqual(params.genre, 'Rock')
        assert.strictEqual(params.formatName, 'CD')
        assert.strictEqual(params.formatDescription, 'Promo')
        assert.strictEqual(params.sleeveCondition, 'Mint (M)')
        assert.strictEqual(params.mediaCondition, 'Mint (M)')
        assert.strictEqual(params.yearRangeLow, '2019')
        assert.strictEqual(params.yearRangeHigh, '2025')
        assert.strictEqual(params.allowsOffers, 'true')
        assert.strictEqual(params.shipsFrom, 'France')
        assert.strictEqual(params.count, '50')
        assert.strictEqual(params.offset, '50')
        assert.strictEqual(params.sort, 'listedDate')
        assert.strictEqual(params.sortOrder, 'descending')
    })

    void test('It should return success value with artist', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            artistIds: [123456],
        })
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
        assert.ok(res.items.length > 0)
    })

    void test('It should return success value with release', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            releaseIds: [767931],
        })
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
        assert.ok(res.items.length > 0)
    })

    void test("It should return good params with user's selling search", async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            sellerIds: [123456],
        })

        assert.strictEqual(res.urlGenerated.includes('/shop-page-api/sell_item'), true)

        const params = url.parse(res.urlGenerated, true).query
        assert.notStrictEqual(params, null)
        assert.strictEqual(params.seller, '123456')
    })

    void test('It should handle multiple currencies', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            currencies: ['USD', 'EUR', 'GBP'],
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.currency)
        assert.ok(Array.isArray(params.currency))
    })

    void test('It should handle multiple genres', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            genres: ['Rock', 'Pop', 'Electronic'],
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.genre)
    })

    void test('It should handle multiple formats', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            formats: ['Vinyl', 'CD'],
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.formatName)
    })

    void test('It should handle price range filtering', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            priceRange: { min: 10, max: 50 },
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.priceRangeLow, '10')
        assert.strictEqual(params.priceRangeHigh, '50')
    })

    void test('It should handle seller rating parameters', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            sellerRatingMin: 95,
            sellerRatingCountMin: 100,
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.sellerRatingMin, '95')
        assert.strictEqual(params.sellerRatingCountMin, '100')
    })

    void test('It should handle sleeve and media options', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            hideGenericSleeves: true,
            hideSleevelessMedia: true,
            showUnavailable: false,
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.hideGenericSleeves, 'true')
        assert.strictEqual(params.hideSleevelessMedia, 'true')
        assert.strictEqual(params.showUnavailable, 'false')
    })

    void test('It should handle multiple artist IDs', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            artistIds: [123456, 789012],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.artist)
        assert.ok(Array.isArray(params.artist))
    })

    void test('It should handle multiple seller IDs', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            sellerIds: [123456, 789012],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(Array.isArray(params.seller))
    })

    void test('It should handle multiple release IDs', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            releaseIds: [767931, 123456],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.release)
        assert.ok(Array.isArray(params.release))
    })

    void test('It should handle multiple shipping countries', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            from: ['US', 'GB', 'DE'],
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.shipsFrom)
    })

    void test('It should handle different sort option for modern API', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            sort: 'price,desc',
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.sort)
        assert.ok(params.sortOrder)
    })

    void test('It should calculate pagination correctly for modern API', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            releaseIds: [767931],
            limit: 50,
            page: 2,
        })

        assert.strictEqual(res.result.perPage, 50)
        assert.strictEqual(res.page.current, 2)

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.count, '50')
        assert.strictEqual(params.offset, '50')

        const expectedTotalPages = Math.ceil(res.result.total / 50)
        assert.strictEqual(res.page.total, expectedTotalPages)
    })

    void test('It should use default values for modern API', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
        })

        assert.strictEqual(res.result.perPage, 25)
        assert.strictEqual(res.page.current, 1)

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.sellerRatingMin, '0')
        assert.strictEqual(params.hideGenericSleeves, 'false')
        assert.strictEqual(params.hideSleevelessMedia, 'false')
        assert.strictEqual(params.showUnavailable, 'true')
        assert.strictEqual(params.sellerRatingCountMin, '0')
    })

    void test('It should handle empty arrays gracefully', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            currencies: [],
            genres: [],
            formats: [],
            formatDescriptions: [],
            conditions: [],
            from: [],
            artistIds: [],
            sellerIds: [],
        })

        assert.ok(res.items.length >= 0)
        assert.ok(typeof res.result.total === 'number')
    })

    void test('It should handle years filter correctly', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            years: { min: 2000, max: 2020 },
            releaseIds: [767931],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.yearRangeLow, '2000')
        assert.strictEqual(params.yearRangeHigh, '2020')
    })
})
