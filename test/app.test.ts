import url from 'url'
import DiscogsMarketplace from '../src/index'

describe('Test marketplace.ts', () => {
    const timeout = 10000

    it('It should return success value', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({ searchType: 'q', searchValue: '' })

        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.result).not.toBe(null)
        expect(res.result?.total).not.toBe(null)
        expect(res.result?.perPage).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.urlGenerated).not.toBe(null)
        expect(res.items[0]?.id).not.toBe(null)
        expect(res.items[0]?.title?.original).not.toBe(null)
        expect(res.items[0]?.title?.artist).not.toBe(null)
        expect(res.items[0]?.title?.item).not.toBe(null)
        expect(res.items[0]?.title?.formats).not.toBe(null)
        expect(res.items[0]?.title?.formats?.length).toBeGreaterThanOrEqual(0)
        expect(res.items[0]?.url).not.toBe(null)
        expect(res.items[0]?.labels).not.toBe(null)
        expect(res.items[0]?.catnos).not.toBe(null)
        expect(res.items[0]?.imageUrl).not.toBe(null)
        expect(res.items[0]?.description).not.toBe(null)
        expect(res.items[0]?.isAcceptingOffer).not.toBe(null)
        expect(res.items[0]?.isAvailable).not.toBe(null)
        expect(res.items[0]?.condition?.media).not.toBe(null)
        expect(res.items[0]?.condition?.media?.full).not.toBe(null)
        expect(res.items[0]?.condition?.media?.short).not.toBe(null)
        expect(res.items[0]?.condition?.sleeve).not.toBe(null)
        expect(res.items[0]?.condition?.sleeve?.full).not.toBe(null)
        expect(res.items[0]?.condition?.sleeve?.short).not.toBe(null)
        expect(res.items[0]?.seller?.name).not.toBe(null)
        expect(res.items[0]?.seller?.url).not.toBe(null)
        expect(res.items[0]?.seller?.notes).not.toBe(null)
        expect(res.items[0]?.seller?.score).not.toBe(null)
        expect(res.items[0]?.price?.base).not.toBe(null)
        expect(res.items[0]?.price?.shipping).not.toBe(null)
        expect(res.items[0]?.country?.name).not.toBe(null)
        expect(res.items[0]?.country?.code).not.toBe(null)
        expect(res.items[0]?.community?.have).not.toBe(null)
        expect(res.items[0]?.community?.want).not.toBe(null)
        expect(res.items[0]?.release.url).not.toBe(null)
        expect(res.items[0]?.release.id).not.toBe(null)
    }, timeout)

    test('It should return error value', async () => {
        try {
            await DiscogsMarketplace.search({ searchType: 'q', searchValue: 'error' })
        } catch (err) {
            expect((err as import('../src/index').OutputErrorType).code).toBe(404)
            expect((err as import('../src/index').OutputErrorType).message).toBe('An error occured')
        }
    }, timeout)

    test('It should return success value with artist', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({ searchType: 'artist_id', searchValue: 123456 })
        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.result).not.toBe(null)
        expect(res.result?.total).not.toBe(null)
        expect(res.result?.perPage).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.urlGenerated).not.toBe(null)
    }, timeout)

    test('It should return good params with artist', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
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
            isAudioSample: false,
            isMakeAnOfferOnly: false,
            from: undefined,
            seller: undefined,
            sort: 'Listed Newest',
            limit: 25,
            page: 1,
            lang: 'en',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params.artist_id).toBe('123456')
        expect(params.currency).toBe(undefined)
        expect(params.genre).toBe(undefined)
        expect(params.style).toBe(undefined)
        expect(params.format).toBe(undefined)
        expect(params.format_desc).toBe(undefined)
        expect(params.condition).toBe(undefined)
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe(undefined)
        expect(params.offers).toBe(undefined)
        expect(params.ships_from).toBe(undefined)
        expect(params.limit).toBe('25')
        expect(params.page).toBe('1')
        expect(params.sort).toBe('Listed Newest')
    }, timeout)

    test('It should return good params with complex search', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
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
            isAudioSample: true,
            isMakeAnOfferOnly: true,
            from: 'France',
            seller: undefined,
            sort: 'Listed Newest',
            limit: 50,
            page: 2,
            lang: 'fr',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params.q).toBe('test')
        expect(params.currency).toBe('EUR')
        expect(params.genre).toBe('Rock')
        expect(params.style).toEqual(['Death Metal', 'Heavy Metal'])
        expect(params.format).toBe('CD')
        expect(params.format_desc).toBe('Promo')
        expect(params.condition).toBe('Mint (M)')
        expect(params.year).toBe('2019')
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe('1')
        expect(params.offers).toBe('1')
        expect(params.ships_from).toBe('France')
        expect(params.limit).toBe('50')
        expect(params.page).toBe('2')
        expect(params.sort).toBe('Listed Newest')
    }, timeout)

    test('It should return good params with complex search and years interval', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
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
            isAudioSample: true,
            isMakeAnOfferOnly: true,
            from: 'France',
            seller: undefined,
            sort: 'Listed Newest',
            limit: 50,
            page: 2,
            lang: 'fr',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params.q).toBe('test')
        expect(params.currency).toBe('EUR')
        expect(params.genre).toBe('Rock')
        expect(params.style).toEqual(['Death Metal', 'Heavy Metal'])
        expect(params.format).toBe('CD')
        expect(params.format_desc).toBe('Promo')
        expect(params.condition).toBe('Mint (M)')
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe('2015')
        expect(params.year2).toBe('2016')
        expect(params.audio).toBe('1')
        expect(params.offers).toBe('1')
        expect(params.ships_from).toBe('France')
        expect(params.limit).toBe('50')
        expect(params.page).toBe('2')
        expect(params.sort).toBe('Listed Newest')
    }, timeout)

    test('It should return good params with user\'s wantlist search', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'TheUser',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(res.urlGenerated.includes('/mywants')).toBe(true)
        expect(res.urlGenerated.includes('/list')).toBe(false)
        expect(params.user).toBe('TheUser')
    }, timeout)

    test('It should return good params with user\'s selling search', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
            searchType: 'q',
            searchValue: '',
            seller: 'TheSeller',
        })

        expect(res.urlGenerated.includes('/seller/TheSeller/')).toBe(true)
        expect(res.urlGenerated.includes('/sell/')).toBe(false)
        expect(res.urlGenerated.includes('/mywants')).toBe(false)
        expect(res.urlGenerated.includes('/profile')).toBe(true)
    }, timeout)

    test('It should return good params with user\'s wantlist search against user\'s selling items', async () => {
        const res: import('../src/index').OutputSuccessType = await DiscogsMarketplace.search({
            searchType: 'user',
            searchValue: 'TheUser',
            seller: 'TheSeller',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(res.urlGenerated.includes('/seller/TheSeller/')).toBe(true)
        expect(res.urlGenerated.includes('/sell/')).toBe(false)
        expect(res.urlGenerated.includes('/mywants')).toBe(true)
        expect(res.urlGenerated.includes('/profile')).toBe(false)
        expect(params.user).toBe('TheUser')
    }, timeout)
})
