import DiscogsMarketplace, {
    IOutputSuccess, IDiscogsMarketplace,
    ECurrency,
    EFormat,
    EFormatDescription,
    EFrom,
    EGenre,
    ELang,
    EMediaCondition,
    ESort,
    EStyle,
    EType,
} from '@main/index'
import url from 'url'

describe('Test marketplace.ts', () => {
    const service: IDiscogsMarketplace = DiscogsMarketplace
    const timeout = 10000

    it('It should return success value', async () => {
        const res: IOutputSuccess = await service.search({ searchType: EType.STRING, searchValue: '' })

        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.item).not.toBe(null)
        expect(res.item?.total).not.toBe(null)
        expect(res.item?.perPage).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.urlGenerated).not.toBe(null)
        expect(res.result[0]?.itemId).not.toBe(null)
        expect(res.result[0]?.title?.original).not.toBe(null)
        expect(res.result[0]?.title?.artist).not.toBe(null)
        expect(res.result[0]?.title?.item).not.toBe(null)
        expect(res.result[0]?.title?.formats).not.toBe(null)
        expect(res.result[0]?.title?.formats?.length).toBeGreaterThanOrEqual(0)
        expect(res.result[0]?.url).not.toBe(null)
        expect(res.result[0]?.labels).not.toBe(null)
        expect(res.result[0]?.catnos).not.toBe(null)
        expect(res.result[0]?.imageUrl).not.toBe(null)
        expect(res.result[0]?.description).not.toBe(null)
        expect(res.result[0]?.isAcceptingOffer).not.toBe(null)
        expect(res.result[0]?.isAvailable).not.toBe(null)
        expect(res.result[0]?.condition?.media).not.toBe(null)
        expect(res.result[0]?.condition?.media?.full).not.toBe(null)
        expect(res.result[0]?.condition?.media?.short).not.toBe(null)
        expect(res.result[0]?.condition?.sleeve).not.toBe(null)
        expect(res.result[0]?.condition?.sleeve?.full).not.toBe(null)
        expect(res.result[0]?.condition?.sleeve?.short).not.toBe(null)
        expect(res.result[0]?.seller?.name).not.toBe(null)
        expect(res.result[0]?.seller?.notes).not.toBe(null)
        expect(res.result[0]?.seller?.score).not.toBe(null)
        expect(res.result[0]?.price?.base).not.toBe(null)
        expect(res.result[0]?.price?.shipping).not.toBe(null)
        expect(res.result[0]?.from?.countryName).not.toBe(null)
        expect(res.result[0]?.from?.isoCountryName).not.toBe(null)
        expect(res.result[0]?.from?.isoCode).not.toBe(null)
        expect(res.result[0]?.community?.have).not.toBe(null)
        expect(res.result[0]?.community?.want).not.toBe(null)
        expect(res.result[0]?.releaseUrl).not.toBe(null)
        expect(res.result[0]?.releaseId).not.toBe(null)
    }, timeout)

    test('It should return error value', async () => {
        try {
            await service.search({ searchType: EType.STRING, searchValue: 'error' })
        } catch (err: any) {
            expect(err.code).toBe(404)
            expect(err.message).toBe('An error occured')
        }
    }, timeout)

    test('It should return success value with artist', async () => {
        const res: IOutputSuccess = await service.search({ searchType: EType.ARTIST, searchValue: 123456 })
        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.item).not.toBe(null)
        expect(res.item?.total).not.toBe(null)
        expect(res.item?.perPage).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.urlGenerated).not.toBe(null)
    }, timeout)

    test('It should return good params with artist', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.ARTIST,
            searchValue: 123456,
            currency: undefined,
            genre: undefined,
            style: [],
            format: [],
            formatDescription: [],
            mediaCondition: [],
            year: undefined,
            years: undefined,
            isAudioSample: false,
            isMakeAnOfferOnly: false,
            from: undefined,
            seller: undefined,
            sort: ESort.LISTED_NEWEST,
            limit: 25,
            page: 1,
            lang: ELang.ENGLISH,
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.ARTIST]).toBe('123456')
        expect(params.currency).toBe(undefined)
        expect(params.genre).toBe(undefined)
        expect(params.style).toBe(undefined)
        expect(params.format).toBe(undefined)
        expect(params.format_desc).toBe(undefined)
        expect(params.condition).toBe(undefined)
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe('0')
        expect(params.offers).toBe('0')
        expect(params.ships_from).toBe(undefined)
        expect(params.limit).toBe('25')
        expect(params.page).toBe('1')
        expect(params.sort).toBe(ESort.LISTED_NEWEST)
    }, timeout)

    test('It should return good params with complex search', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: 'test',
            currency: ECurrency.EUR,
            genre: EGenre.ROCK,
            style: [EStyle.DEATHMETAL, EStyle.HEAVYMETAL],
            format: [EFormat.CD],
            formatDescription: [EFormatDescription.PROMO],
            mediaCondition: [EMediaCondition.MINT],
            year: 2019,
            years: undefined,
            isAudioSample: true,
            isMakeAnOfferOnly: true,
            from: EFrom.FRANCE,
            seller: undefined,
            sort: ESort.LISTED_OLDEST,
            limit: 50,
            page: 2,
            lang: ELang.FRENCH,
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.STRING]).toBe('test')
        expect(params.currency).toBe(ECurrency.EUR)
        expect(params.genre).toBe(EGenre.ROCK)
        expect(params.style).toEqual([EStyle.DEATHMETAL, EStyle.HEAVYMETAL])
        expect(params.format).toBe(EFormat.CD)
        expect(params.format_desc).toBe(EFormatDescription.PROMO)
        expect(params.condition).toBe(EMediaCondition.MINT)
        expect(params.year).toBe('2019')
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe('1')
        expect(params.offers).toBe('1')
        expect(params.ships_from).toBe(EFrom.FRANCE)
        expect(params.limit).toBe('50')
        expect(params.page).toBe('2')
        expect(params.sort).toBe(ESort.LISTED_OLDEST)
    }, timeout)

    test('It should return good params with complex search and years interval', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: 'test',
            currency: ECurrency.EUR,
            genre: EGenre.ROCK,
            style: [EStyle.DEATHMETAL, EStyle.HEAVYMETAL],
            format: [EFormat.CD],
            formatDescription: [EFormatDescription.PROMO],
            mediaCondition: [EMediaCondition.MINT],
            year: undefined,
            years: { min: 2015, max: 2016 },
            isAudioSample: true,
            isMakeAnOfferOnly: true,
            from: EFrom.FRANCE,
            seller: undefined,
            sort: ESort.LISTED_OLDEST,
            limit: 50,
            page: 2,
            lang: ELang.FRENCH,
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.STRING]).toBe('test')
        expect(params.currency).toBe(ECurrency.EUR)
        expect(params.genre).toBe(EGenre.ROCK)
        expect(params.style).toEqual([EStyle.DEATHMETAL, EStyle.HEAVYMETAL])
        expect(params.format).toBe(EFormat.CD)
        expect(params.format_desc).toBe(EFormatDescription.PROMO)
        expect(params.condition).toBe(EMediaCondition.MINT)
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe('2015')
        expect(params.year2).toBe('2016')
        expect(params.audio).toBe('1')
        expect(params.offers).toBe('1')
        expect(params.ships_from).toBe(EFrom.FRANCE)
        expect(params.limit).toBe('50')
        expect(params.page).toBe('2')
        expect(params.sort).toBe(ESort.LISTED_OLDEST)
    }, timeout)

    test('It should return good params with user\'s wantlist search', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.USER,
            searchValue: 'TheUser',
        })

        const params = url.parse(res.urlGenerated, true)?.query
        expect(res.urlGenerated.includes('/mywants')).toBe(true)
        expect(res.urlGenerated.includes('/list')).toBe(false)
        expect(params.user).toBe('TheUser')
    }, timeout)

    test('It should return good params with user\'s selling search', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: '',
            seller: 'TheSeller',
        })

        expect(res.urlGenerated.includes('/seller/TheSeller/')).toBe(true)
        expect(res.urlGenerated.includes('/sell/')).toBe(false)
        expect(res.urlGenerated.includes('/mywants')).toBe(false)
        expect(res.urlGenerated.includes('/profile')).toBe(true)
    }, timeout)

    test('It should return good params with user\'s wantlist search against user\'s selling items', async () => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.USER,
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
