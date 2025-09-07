import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { DiscogsMarketplace } from '../src/index'

void describe('Test legacy search functionality', () => {
    void test('It should return success value with basic search', async () => {
        const res = await DiscogsMarketplace.search({ api: 'legacy', query: '' })

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

    void test('It should handle error gracefully with malformed query', async () => {
        await assert.rejects(
            async () => {
                await DiscogsMarketplace.search({
                    api: 'legacy',
                    // This will cause a 502 error
                    query: new Array(1500).fill('error').join(''),
                })
            },
            {
                name: 'Error',
                message:
                    // eslint-disable-next-line max-len
                    'Please visit <a href="https://status.discogs.com" target="_blank" rel="noreferrer noopener">status.discogs.com</a> for the latest updates on site availability.', // cspell: disable-line
            },
        )
    })

    void test('It should generate correct URL parameters with complex search', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'test',
            currency: 'EUR',
            genre: 'Rock',
            styles: ['Death Metal', 'Heavy Metal'],
            formats: ['CD'],
            formatDescriptions: ['Promo'],
            condition: 'Mint (M)',
            years: { min: 2015, max: 2016 },
            isMakeAnOfferOnly: true,
            from: 'FR',
            sort: 'listed,desc',
            limit: 50,
            page: 2,
            lang: 'fr',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.notStrictEqual(params, null)
        assert.strictEqual(params.q, 'test')
        assert.strictEqual(params.currency, 'EUR')
        assert.strictEqual(params.genre, 'Rock')
        assert.deepStrictEqual(params.style, ['Death Metal', 'Heavy Metal'])
        assert.strictEqual(params.format, 'CD')
        assert.strictEqual(params.format_desc, 'Promo')
        assert.strictEqual(params.condition, 'Mint (M)')
        assert.strictEqual(params.year, undefined)
        assert.strictEqual(params.year1, '2015')
        assert.strictEqual(params.year2, '2016')
        assert.strictEqual(params.offers, '1')
        assert.strictEqual(params.ships_from, 'France')
        assert.strictEqual(params.limit, '50')
        assert.strictEqual(params.page, '2')
        assert.strictEqual(params.sort, 'listed,desc')
    })

    void test('It should handle search with master ID', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            masterId: 1,
            limit: 25,
        })

        assert.ok(res.items.length >= 0)
        assert.strictEqual(res.result.perPage, 25)
        assert.strictEqual(res.page.current, 1)
        const params = url.parse(res.urlGenerated, true).query
        assert.equal(params.master_id, '1')
    })

    void test('It should handle search with release ID', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            releaseId: 767931,
            limit: 50,
        })

        assert.ok(res.items.length >= 0)
        assert.strictEqual(res.result.perPage, 50)
        const params = url.parse(res.urlGenerated, true).query
        assert.equal(params.release_id, '767931')
    })

    void test('It should handle search with label ID', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            labelId: 1,
            limit: 100,
        })

        assert.ok(res.items.length >= 0)
        assert.strictEqual(res.result.perPage, 100)
        const params = url.parse(res.urlGenerated, true).query
        assert.equal(params.label_id, '1')
    })

    void test('It should handle search with artist ID', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            artistId: 1,
            limit: 250,
        })

        assert.ok(res.items.length >= 0)
        assert.strictEqual(res.result.perPage, 250)
        const params = url.parse(res.urlGenerated, true).query
        assert.equal(params.artist_id, '1')
    })

    void test('It should handle search with seller parameter', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            seller: 'Kirian_',
            query: 'vinyl',
        })

        assert.ok(res.items.length >= 0)
        assert.ok(res.urlGenerated.includes('/seller/Kirian_/'))
    })

    void test('It should handle search with user parameter', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            user: 'Kirian_',
            seller: 'Kirian_',
        })

        assert.ok(res.items.length >= 0)
        assert.ok(res.urlGenerated.includes('/mywants'))
    })

    void test('It should handle empty search results', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            // cspell: disable-next-line
            query: 'veryrarequerythatshouldhavezeroresults123456789',
        })

        assert.ok(Array.isArray(res.items))
        assert.strictEqual(typeof res.result.total, 'number')
        assert.ok(res.result.total === 0)
    })

    void test('It should use default values when parameters are not provided', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'test',
        })

        assert.strictEqual(res.result.perPage, 25)
        assert.strictEqual(res.page.current, 1)
        assert.ok(res.urlGenerated.includes('/en/'))
    })

    void test('It should handle multiple formats correctly', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'test',
            formats: ['Vinyl', 'CD'],
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.ok(Array.isArray(params.format))
    })

    void test('It should calculate pagination correctly', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'popular',
            limit: 50,
            page: 1,
        })

        assert.strictEqual(res.result.perPage, 50)
        assert.strictEqual(res.page.current, 1)

        const expectedTotalPages = Math.ceil(res.result.total / 50)
        assert.strictEqual(res.page.total, expectedTotalPages)
    })

    void test('It should handle different sort option', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'test',
            sort: 'price,asc',
            limit: 25,
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.equal(params.sort, 'price,asc')
    })

    void test('It should handle different language', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            query: 'test',
            lang: 'fr',
            limit: 25,
        })

        assert.ok(res.urlGenerated.includes('/fr/'))
    })
})
