import { describe, test } from 'node:test'
import assert from 'node:assert'
import url from 'url'
import { chromium } from 'patchright'
import { DiscogsMarketplace } from '../src/index'

void describe('Test wantlist functionality', () => {
    void test("It should get the releases of a user's wantlist", async () => {
        const ids = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_')

        assert.ok(ids.length > 0)
        assert.ok(ids.every(x => Number.isInteger(x) && x > 0))
        assert.strictEqual(new Set(ids).size, ids.length)
    })

    void test("It should get only the releases for sale of a user's wantlist", async () => {
        const [ids, idsForSale] = await Promise.all([
            DiscogsMarketplace.getWantlistReleaseIds('Kirian_'),
            DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { onlyForSale: true }),
        ])

        assert.ok(idsForSale.length > 0)
        assert.ok(idsForSale.length <= ids.length)
        assert.ok(idsForSale.every(x => ids.includes(x)))
    })

    void test('It should use the provided browser for the releases for sale, and not close it', async () => {
        const browser = await chromium.launch({ headless: true, chromiumSandbox: false })

        try {
            const ids = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { onlyForSale: true }, browser)

            assert.ok(ids.length > 0)
            assert.ok(browser.isConnected())
        } finally {
            await browser.close()
        }
    })

    void test('It should not allow a token with the releases for sale', async () => {
        await assert.rejects(async () => {
            // @ts-expect-error The token cannot be used with `onlyForSale`
            await DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { token: 'token', onlyForSale: true })
            throw new Error('Type only check')
        })
    })

    void test('It should fail on an unknown user', async () => {
        await assert.rejects(DiscogsMarketplace.getWantlistReleaseIds('nonexistentuser12345'), {
            message: 'User does not exist or may have been deleted.',
        })
    })

    void test('It should return nothing for sale for an unknown user', async () => {
        const ids = await DiscogsMarketplace.getWantlistReleaseIds('nonexistentuser12345', { onlyForSale: true })

        assert.deepStrictEqual(ids, [])
    })

    void test("It should search the listings of a user's wantlist", async () => {
        const releaseIds = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { onlyForSale: true })
        const res = await DiscogsMarketplace.search({ releaseIds, limit: 50 })

        assert.ok(res.total > 0)
        assert.ok(res.items.every(x => releaseIds.includes(x.release.id)))
        assert.strictEqual(url.parse(res.urlGenerated, true).query.release?.length, releaseIds.length)
    })

    void test("It should combine a user's wantlist with a seller", async () => {
        const releaseIds = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_')
        const res = await DiscogsMarketplace.search({ releaseIds, sellerIds: [1240899] })

        assert.ok(res.items.every(x => x.seller.id === 1240899 && releaseIds.includes(x.release.id)))
        assert.strictEqual(url.parse(res.urlGenerated, true).query.seller, '1240899')
    })
})
