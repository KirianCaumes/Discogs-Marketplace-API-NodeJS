import { describe, test } from 'node:test'
import assert from 'node:assert'
import { DiscogsMarketplace } from 'index'

void describe('Test get-search-params.ts', () => {
    void test('It should return valid search params', () => {
        const searchParams = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/fr/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock',
        )

        assert.deepEqual(searchParams, {
            searchType: 'artist_id',
            searchValue: '244819',
            genre: 'Rock',
            sort: 'listed,desc',
            limit: 250,
            page: 2,
            lang: 'fr',
        })
    })

    void test('It should return valid search params', () => {
        const searchParams = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/mywants?limit=50&user=Kirian_&sort=price,asc',
        )

        assert.deepEqual(searchParams, {
            searchType: 'user',
            searchValue: 'Kirian_',
            sort: 'price,asc',
            limit: 50,
        })
    })

    void test('It should return valid search params', () => {
        const output = {
            searchType: 'release_id',
            searchValue: '767931',
            sort: 'seller,asc',
            limit: 25,
            page: 1,
        }

        const searchParams1 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/list?release_id=767931&sort=seller,asc&limit=25&page=1',
        )

        assert.deepEqual(searchParams1, output)

        const searchParams2 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/list?release_id=767931&sort=seller,asc&limit=25&page=1',
        )

        assert.deepEqual(searchParams2, output)
    })

    void test('It should return valid search params', () => {
        const searchParams = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/list?sort=listed,desc&limit=100&q=in+flames&page=1',
        )

        assert.deepEqual(searchParams, {
            searchType: 'q',
            searchValue: 'in flames',
            sort: 'listed,desc',
            limit: 100,
            page: 1,
        })
    })

    void test('It should return valid search params', () => {
        const output = {
            searchType: 'q',
            seller: 'Kirian_',
            sort: 'listed,desc',
            limit: 25,
            page: 1,
        }

        const searchParams1 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/list?sort=listed,desc&limit=25&page=1&seller=Kirian_',
        )

        assert.deepEqual(searchParams1, output)

        const searchParams2 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/seller/Kirian_/profile?sort=listed,desc&limit=25&page=1',
        )

        assert.deepEqual(searchParams2, output)
    })

    void test('It should return valid search params', () => {
        const output = {
            searchType: 'user',
            searchValue: 'Kirian_',
            seller: 'Kirian_',
            sort: 'listed,desc',
            limit: 25,
            page: 1,
        }

        const searchParams1 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/sell/mywants?sort=listed,desc&limit=25&page=1&seller=Kirian_&user=Kirian_',
        )

        assert.deepEqual(searchParams1, output)

        const searchParams2 = DiscogsMarketplace.getSearchParamsFromUrl(
            'https://www.discogs.com/seller/Kirian_/mywants?sort=listed,desc&limit=25&user=Kirian_&page=1',
        )

        assert.deepEqual(searchParams2, output)
    })
})
