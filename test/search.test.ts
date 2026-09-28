import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { DiscogsMarketplace } from '../src/index'

void describe('Test search functionality', () => {
    void test('It should return success value with basic search', async () => {
        const res = await DiscogsMarketplace.search({})

        assert.ok(res.total > 0)
        assert.ok(res.nextCursor)
        assert.ok(res.urlGenerated.startsWith('https://www.discogs.com/shop/list'))
        assert.strictEqual(res.items.length, 25)

        const [item] = res.items
        assert.ok(item)
        assert.strictEqual(typeof item.id, 'number')
        assert.strictEqual(typeof item.title, 'string')
        assert.ok(Array.isArray(item.artists))
        assert.strictEqual(typeof item.release.id, 'number')
        assert.ok(item.release.url.startsWith('https://www.discogs.com/release/'))
        assert.ok(Array.isArray(item.formats))
        assert.ok(Array.isArray(item.labels))
        assert.ok(Array.isArray(item.catnos))
        assert.ok(Array.isArray(item.photos))
        assert.ok(item.url.startsWith('https://www.discogs.com/shop/item/'))
        assert.ok(item.listedAt instanceof Date)
        assert.strictEqual(typeof item.isAcceptingOffer, 'boolean')
        assert.strictEqual(typeof item.isAvailable, 'boolean')
        assert.ok(item.condition.media.full)
        assert.ok(item.condition.media.short)
        assert.ok(item.seller.id > 0)
        assert.strictEqual(typeof item.seller.name, 'string')
        assert.strictEqual(typeof item.seller.isIndependent, 'boolean')
        assert.ok(item.seller.url.startsWith('https://www.discogs.com/seller/'))
        assert.match(item.price.base, /^\d+(\.\d+)? [A-Z]{3}$/)
        assert.strictEqual(typeof item.country.name, 'string')
        assert.strictEqual(typeof item.community.have, 'number')
        assert.strictEqual(typeof item.community.want, 'number')
    })

    void test('It should search with a query', async () => {
        const res = await DiscogsMarketplace.search({ query: 'nirvana nevermind', limit: 10 })

        assert.ok(res.total > 0)
        assert.strictEqual(res.items.length, 10)
        assert.strictEqual(url.parse(res.urlGenerated, true).query.q, 'nirvana nevermind')
    })

    void test('It should search by artist, label, master and release', async () => {
        const [artist, label, master, release] = await Promise.all([
            DiscogsMarketplace.search({ artistIds: [244819], limit: 5 }),
            DiscogsMarketplace.search({ labelIds: [11499], limit: 5 }),
            DiscogsMarketplace.search({ masterIds: [33474], limit: 5 }),
            DiscogsMarketplace.search({ releaseIds: [6889243], limit: 5 }),
        ])

        // Discogs also matches the releases where the artist is only credited, or where the label has another role
        assert.ok(artist.items.some(x => x.artists.some(a => a.id === 244819)))
        assert.ok(label.items.some(x => x.labels.some(l => l.id === 11499)))
        assert.ok(master.total > 0)
        assert.ok(release.items.every(x => x.release.id === 6889243))
        assert.strictEqual(url.parse(master.urlGenerated, true).query.master, '33474')
    })

    void test('It should return the details of the release', async () => {
        const res = await DiscogsMarketplace.search({ releaseIds: [6889243], limit: 5 })

        assert.ok(res.items.length > 0)
        assert.ok(res.items.every(x => x.release.year === 2006))
        assert.ok(res.items.every(x => x.release.country === 'Germany'))
        assert.ok(res.items.every(x => (x.release.rating ?? 0) > 0 && (x.release.rating ?? 0) <= 5))
    })

    void test('It should search by seller', async () => {
        const res = await DiscogsMarketplace.search({ sellerIds: [1240899], limit: 5 })

        assert.ok(res.items.every(x => x.seller.name === 'Dream-Mode' && x.seller.id === 1240899))
    })

    void test('It should apply the filters', async () => {
        const res = await DiscogsMarketplace.search({
            genres: ['Rock'],
            styles: ['Death Metal'],
            formats: ['CD'],
            mediaConditions: ['Mint (M)'],
            sleeveConditions: ['Mint (M)'],
            from: ['FR'],
            priceRange: { min: 5, max: 100 },
            years: { min: 1990, max: 2025 },
            isMakeAnOfferOnly: true,
            limit: 10,
        })

        assert.ok(res.items.length > 0)
        assert.ok(res.items.every(x => x.formats.includes('CD')))
        assert.ok(res.items.every(x => x.condition.media.full === 'Mint (M)'))
        assert.ok(res.items.every(x => x.condition.sleeve.full === 'Mint (M)'))
        assert.ok(res.items.every(x => x.country.code === 'FR'))
        assert.ok(res.items.every(x => x.isAcceptingOffer))
        assert.ok(res.items.every(x => parseFloat(x.price.base) >= 5))

        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.genre, 'Rock')
        assert.strictEqual(params.style, 'Death Metal')
        assert.strictEqual(params.formatName, 'CD')
        assert.strictEqual(params.mediaCondition, 'Mint (M)')
        assert.strictEqual(params.sleeveCondition, 'Mint (M)')
        assert.ok([params.shipsFrom].flat().includes('France'))
        assert.strictEqual(params.priceMin, '5')
        assert.strictEqual(params.priceMax, '100')
        assert.deepStrictEqual(params.year, ['1990', '2025'])
        assert.strictEqual(params.allowsOffers, 'true')
    })

    void test('It should filter by the countries Discogs names its own way', async () => {
        const [us, gb] = await Promise.all([
            DiscogsMarketplace.search({ artistIds: [244819], from: ['US'], limit: 10 }),
            DiscogsMarketplace.search({ artistIds: [244819], from: ['GB'], limit: 10 }),
        ])

        assert.ok(us.items.length > 0)
        assert.ok(us.items.every(x => x.country.code === 'US'))
        assert.ok(gb.items.length > 0)
        assert.ok(gb.items.every(x => x.country.code === 'GB'))
    })

    void test('It should filter by currency and seller rating', async () => {
        const res = await DiscogsMarketplace.search({
            artistIds: [244819],
            currencies: ['EUR', 'GBP'],
            sellerRatingMin: 99,
            sellerRatingCountMin: 1000,
            limit: 50,
        })

        assert.ok(res.items.length > 0)
        assert.ok(res.items.every(x => x.price.base.endsWith('EUR') || x.price.base.endsWith('GBP')))
        assert.ok(res.items.every(x => parseFloat(x.seller.score ?? '100') >= 99))
        assert.ok(res.items.every(x => (x.seller.notes ?? 0) >= 1000))
    })

    void test('It should only return listings with photos', async () => {
        const res = await DiscogsMarketplace.search({ hasItemPhotos: true, limit: 10 })

        assert.ok(res.items.length > 0)
        assert.ok(res.items.every(x => x.photos.length > 0 && x.photos.every(p => p.startsWith('https://'))))
    })

    void test('It should sort the results', async () => {
        const res = await DiscogsMarketplace.search({ artistIds: [244819], sort: 'price,asc', limit: 25 })
        const prices = res.items.filter(x => x.price.base.endsWith('EUR')).map(x => parseFloat(x.price.base))

        assert.deepStrictEqual(
            prices,
            [...prices].sort((a, b) => a - b),
        )
        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.sort, 'price')
        assert.strictEqual(params.sortOrder, 'ascending')
    })

    void test('It should sort with the sorts the Discogs shop does not offer', async () => {
        const res = await DiscogsMarketplace.search({ artistIds: [244819], sort: 'sellerRatingCount,desc', limit: 25 })
        const counts = res.items.map(x => x.seller.notes ?? 0)

        assert.deepStrictEqual(
            counts,
            [...counts].sort((a, b) => b - a),
        )
        const params = url.parse(res.urlGenerated, true).query
        assert.strictEqual(params.sort, undefined)
        assert.strictEqual(params.sortOrder, undefined)
    })

    void test('It should paginate with the cursor', async () => {
        const first = await DiscogsMarketplace.search({ artistIds: [244819], limit: 10 })
        const second = await DiscogsMarketplace.search({ artistIds: [244819], limit: 10, after: first.nextCursor ?? '' })

        assert.strictEqual(second.items.length, 10)
        assert.ok(second.items.every(x => !first.items.some(y => y.id === x.id)))
        assert.strictEqual(url.parse(second.urlGenerated, true).query.after, first.nextCursor)
    })

    void test('It should have no cursor on the last page', async () => {
        const res = await DiscogsMarketplace.search({ masterIds: [33474], limit: 250 })

        assert.ok(res.items.length > 0)
        assert.strictEqual(res.nextCursor, null)
    })

    void test('It should reject invalid parameters', async () => {
        await assert.rejects(DiscogsMarketplace.search({ releaseIds: Array.from({ length: 2001 }, (_, i) => i + 1) }), {
            message: 'At most 2000 release IDs are supported.',
        })
    })
})
