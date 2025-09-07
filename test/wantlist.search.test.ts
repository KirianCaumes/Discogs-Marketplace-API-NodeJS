import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { DiscogsMarketplace } from '../src/index'

void describe('Test wantlist search functionality', () => {
    void test("It should return good params with user's wantlist search", async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(res.urlGenerated.includes('/shop-page-api/sell_item'), true)
        assert.strictEqual(res.urlGenerated.includes('/list'), false)
        assert.notEqual(params.release, null)
        assert.ok((params.release?.length ?? 0) > 0)
    })

    void test("It should return good params with user's wantlist search against user's selling items", async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            sellerIds: [123456],
        })

        assert.strictEqual(res.urlGenerated.includes('/shop-page-api/sell_item'), true)

        const params = url.parse(res.urlGenerated, true).query

        assert.notStrictEqual(params, null)
        assert.strictEqual(params.seller, '123456')
        assert.notEqual(params.release, null)
        assert.ok((params.release?.length ?? 0) > 0)
    })

    void test('It should handle wantlist with additional filters', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            currencies: ['USD'],
            conditions: ['Mint (M)'],
            limit: 50,
            page: 1,
        })

        assert.strictEqual(res.result.perPage, 50)
        assert.strictEqual(res.page.current, 1)

        const params = url.parse(res.urlGenerated, true).query
        assert.notStrictEqual(params, null)
        assert.ok(params.release)
        assert.strictEqual(params.currency, 'USD')
        assert.strictEqual(params.mediaCondition, 'Mint (M)')
        assert.strictEqual(params.count, '50')
        assert.strictEqual(params.offset, '0')
    })

    void test('It should handle wantlist with price range', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            priceRange: { min: 5, max: 100 },
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.priceRangeLow, '5')
        assert.strictEqual(params.priceRangeHigh, '100')
    })

    void test('It should handle wantlist with seller ratings', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            sellerRatingMin: 90,
            sellerRatingCountMin: 50,
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.sellerRatingMin, '90')
        assert.strictEqual(params.sellerRatingCountMin, '50')
    })

    void test('It should handle wantlist with make offer filter', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            isMakeAnOfferOnly: true,
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.allowsOffers, 'true')
    })

    void test('It should handle wantlist with shipping countries', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            from: ['US', 'GB'],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.shipsFrom)
    })

    void test('It should handle wantlist with sort option', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            sort: 'price,asc',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.sort)
        assert.ok(params.sortOrder)
    })

    void test('It should handle empty wantlist gracefully', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            // cspell: disable-next-line
            wantlist: 'nonexistentuser12345',
        })

        assert.ok(res.result.total === 0)
    })

    void test('It should combine wantlist with seller search correctly', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            sellerIds: [123456, 789012],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(params.release)
        assert.ok(params.seller)
    })

    void test('It should validate item structure in wantlist results', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
        })

        const item = res.items[0]
        if (!item) {
            return
        }

        assert.strictEqual(typeof item.id, 'number')
        assert.strictEqual(typeof item.title, 'string')
        assert.ok(Array.isArray(item.artists))
        assert.strictEqual(typeof item.release.id, 'number')
        assert.ok(Array.isArray(item.formats))
        assert.strictEqual(typeof item.url, 'string')
        assert.ok(item.listedAt instanceof Date)
        assert.strictEqual(typeof item.isAcceptingOffer, 'boolean')
        assert.strictEqual(typeof item.isAvailable, 'boolean')
        assert.strictEqual(typeof item.seller.name, 'string')
        assert.strictEqual(typeof item.country.code, 'string')
        assert.strictEqual(item.country.code.length, 2)
    })

    void test('It should handle wantlist pagination correctly', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            wantlist: 'Kirian_',
            limit: 25,
            page: 2,
        })

        assert.strictEqual(res.result.perPage, 25)
        assert.strictEqual(res.page.current, 2)

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.count, '25')
        assert.strictEqual(params.offset, '25')
    })
})
