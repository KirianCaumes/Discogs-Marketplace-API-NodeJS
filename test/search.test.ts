import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { DiscogsMarketplace } from '../src/index'

void describe('Test search.ts', () => {
    void test('It should return success value', async () => {
        const res = await DiscogsMarketplace.search({ searchType: 'q', searchValue: '' })

        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
        assert.notStrictEqual(res.items[0]?.id, undefined)
        assert.notStrictEqual(res.items[0]?.title.original, undefined)
        assert.notStrictEqual(res.items[0]?.title.artist, undefined)
        assert.notStrictEqual(res.items[0]?.title.item, undefined)
        assert.notStrictEqual(res.items[0]?.title.formats, undefined)
        assert.ok((res.items[0]?.title.formats.length ?? 0) >= 0)
        assert.notStrictEqual(res.items[0]?.url, undefined)
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

    void test('It should return error value', async () => {
        await assert.rejects(
            async () => {
                await DiscogsMarketplace.search({
                    searchType: 'q',
                    // This will cause a 502 error
                    searchValue: new Array(1500).fill('error').join(''),
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

    void test('It should return less value with hours range', async () => {
        const resWithRange = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'Kirian_',
            hoursRange: '0-24',
        })
        const resWithoutRange = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'Kirian_',
        })

        assert.ok(resWithRange.result.total <= resWithoutRange.result.total)
    })

    void test('It should return success value with artist', async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'artist_id',
            searchValue: 123456,
        })
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
    })

    void test('It should return success value with release', async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'release_id',
            searchValue: '767931',
        })
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.page, null)
        assert.notStrictEqual(res.page.current, null)
        assert.notStrictEqual(res.page.total, null)
        assert.notStrictEqual(res.result, null)
        assert.notStrictEqual(res.result.total, null)
        assert.notStrictEqual(res.result.perPage, null)
        assert.notStrictEqual(res.urlGenerated, null)
    })

    void test('It should return good params with artist', async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'artist_id',
            searchValue: 123456,
            currency: undefined,
            genre: undefined,
            style: [],
            format: [],
            formatDescription: [],
            condition: [],
            year: undefined,
            years: undefined,
            isMakeAnOfferOnly: false,
            from: undefined,
            seller: undefined,
            sort: 'listed,desc',
            limit: 25,
            page: 1,
            lang: 'en',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.notStrictEqual(params, null)
        assert.strictEqual(params.artist_id, '123456')
        assert.strictEqual(params.currency, undefined)
        assert.strictEqual(params.genre, undefined)
        assert.strictEqual(params.style, undefined)
        assert.strictEqual(params.format, undefined)
        assert.strictEqual(params.format_desc, undefined)
        assert.strictEqual(params.condition, undefined)
        assert.strictEqual(params.year, undefined)
        assert.strictEqual(params.year1, undefined)
        assert.strictEqual(params.year2, undefined)
        assert.strictEqual(params.offers, undefined)
        assert.strictEqual(params.ships_from, undefined)
        assert.strictEqual(params.limit, '25')
        assert.strictEqual(params.page, '1')
        assert.strictEqual(params.sort, 'listed,desc')
    })

    void test('It should return good params with complex search', async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'q',
            searchValue: 'test',
            currency: 'EUR',
            genre: 'Rock',
            style: ['Death Metal', 'Heavy Metal'],
            format: ['CD'],
            formatDescription: ['Promo'],
            condition: ['Mint (M)'],
            year: 2019,
            years: undefined,
            isMakeAnOfferOnly: true,
            from: 'France',
            seller: undefined,
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
        assert.strictEqual(params.year, '2019')
        assert.strictEqual(params.year1, undefined)
        assert.strictEqual(params.year2, undefined)
        assert.strictEqual(params.offers, '1')
        assert.strictEqual(params.ships_from, 'France')
        assert.strictEqual(params.limit, '50')
        assert.strictEqual(params.page, '2')
        assert.strictEqual(params.sort, 'listed,desc')
    })

    void test('It should return good params with complex search and years interval', async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'q',
            searchValue: 'test',
            currency: 'EUR',
            genre: 'Rock',
            style: ['Death Metal', 'Heavy Metal'],
            format: ['CD'],
            formatDescription: ['Promo'],
            condition: ['Mint (M)'],
            year: undefined,
            years: { min: 2015, max: 2016 },
            isMakeAnOfferOnly: true,
            from: 'France',
            seller: undefined,
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

    void test("It should return good params with user's wantlist search", async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'TheUser',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(res.urlGenerated.includes('/mywants'), true)
        assert.strictEqual(res.urlGenerated.includes('/list'), false)
        assert.strictEqual(params.user, 'TheUser')
    })

    void test("It should return good params with user's selling search", async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'q',
            searchValue: '',
            seller: 'TheSeller',
        })

        assert.strictEqual(res.urlGenerated.includes('/seller/TheSeller/'), true)
        assert.strictEqual(res.urlGenerated.includes('/sell/'), false)
        assert.strictEqual(res.urlGenerated.includes('/mywants'), false)
        assert.strictEqual(res.urlGenerated.includes('/profile'), true)
    })

    void test("It should return good params with user's wantlist search against user's selling items", async () => {
        const res = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'TheUser',
            seller: 'TheSeller',
        })

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(res.urlGenerated.includes('/seller/TheSeller/'), true)
        assert.strictEqual(res.urlGenerated.includes('/sell/'), false)
        assert.strictEqual(res.urlGenerated.includes('/mywants'), true)
        assert.strictEqual(res.urlGenerated.includes('/profile'), false)
        assert.strictEqual(params.user, 'TheUser')
    })
})
