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
    EType
} from "@main/index"
import url from 'url'

describe('Test marketplace.ts', () => {
    const service: IDiscogsMarketplace = DiscogsMarketplace
    const timeout = 10000

    test('should return success value', async (done) => {
        const res: IOutputSuccess = await service.search({ searchType: EType.STRING, searchValue: "" })

        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.item).not.toBe(null)
        expect(res.item?.total).not.toBe(null)
        expect(res.item?.per_page).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.url_generated).not.toBe(null)
        done()
    }, timeout)

    test('should return error value', async (done) => {
        try {
            await service.search({ searchType: EType.STRING, searchValue: "error" })
        } catch (err: any) {
            expect(err.code).toBe(404)
            expect(err.message).toBe("An error occured")
        } finally {
            done()
        }
    }, timeout)

    test('should return success value with artist', async (done) => {
        const res: IOutputSuccess = await service.search({ searchType: EType.ARTIST, searchValue: 123456 })
        expect(res.result).not.toBe(null)
        expect(res.page).not.toBe(null)
        expect(res.page?.current).not.toBe(null)
        expect(res.page?.total).not.toBe(null)
        expect(res.item).not.toBe(null)
        expect(res.item?.total).not.toBe(null)
        expect(res.item?.per_page).not.toBe(null)
        expect(res.search).not.toBe(null)
        expect(res.search?.value).not.toBe(null)
        expect(res.search?.type).not.toBe(null)
        expect(res.url_generated).not.toBe(null)
        done()
    }, timeout)

    test('should return good params with artist', async (done) => {
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
            lang: ELang.ENGLISH
        })

        const params = url.parse(res.url_generated!, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.ARTIST]).toBe("123456")
        expect(params.currency).toBe(undefined)
        expect(params.genre).toBe(undefined)
        expect(params.style).toBe(undefined)
        expect(params.format).toBe(undefined)
        expect(params.format_desc).toBe(undefined)
        expect(params.condition).toBe(undefined)
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe("0")
        expect(params.offers).toBe("0")
        expect(params.ships_from).toBe(undefined)
        expect(params.limit).toBe("25")
        expect(params.page).toBe("1")
        expect(params.sort).toBe(ESort.LISTED_NEWEST)
        done()
    }, timeout)

    test('should return good params with complex search', async (done) => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: "test",
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
            lang: ELang.FRENCH
        })

        const params = url.parse(res.url_generated!, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.STRING]).toBe("test")
        expect(params.currency).toBe(ECurrency.EUR)
        expect(params.genre).toBe(EGenre.ROCK)
        expect(params.style).toEqual([EStyle.DEATHMETAL, EStyle.HEAVYMETAL])
        expect(params.format).toBe(EFormat.CD)
        expect(params.format_desc).toBe(EFormatDescription.PROMO)
        expect(params.condition).toBe(EMediaCondition.MINT)
        expect(params.year).toBe("2019")
        expect(params.year1).toBe(undefined)
        expect(params.year2).toBe(undefined)
        expect(params.audio).toBe("1")
        expect(params.offers).toBe("1")
        expect(params.ships_from).toBe(EFrom.FRANCE)
        expect(params.limit).toBe("50")
        expect(params.page).toBe("2")
        expect(params.sort).toBe(ESort.LISTED_OLDEST)
        done()
    }, timeout)

    test('should return good params with complex search and years interval', async (done) => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: "test",
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
            lang: ELang.FRENCH
        })

        const params = url.parse(res.url_generated!, true)?.query
        expect(params).not.toBe(null)
        expect(params[EType.STRING]).toBe("test")
        expect(params.currency).toBe(ECurrency.EUR)
        expect(params.genre).toBe(EGenre.ROCK)
        expect(params.style).toEqual([EStyle.DEATHMETAL, EStyle.HEAVYMETAL])
        expect(params.format).toBe(EFormat.CD)
        expect(params.format_desc).toBe(EFormatDescription.PROMO)
        expect(params.condition).toBe(EMediaCondition.MINT)
        expect(params.year).toBe(undefined)
        expect(params.year1).toBe("2015")
        expect(params.year2).toBe("2016")
        expect(params.audio).toBe("1")
        expect(params.offers).toBe("1")
        expect(params.ships_from).toBe(EFrom.FRANCE)
        expect(params.limit).toBe("50")
        expect(params.page).toBe("2")
        expect(params.sort).toBe(ESort.LISTED_OLDEST)
        done()
    }, timeout)

    test('should return good params with user\'s wantlist search', async (done) => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.USER,
            searchValue: "TheUser"
        })

        const params = url.parse(res.url_generated!, true)?.query
        expect(res.url_generated!.includes('/mywants')).toBe(true)
        expect(res.url_generated!.includes('/list')).toBe(false)
        expect(params.user).toBe("TheUser")
        done()
    }, timeout)

    test('should return good params with user\'s selling search', async (done) => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.STRING,
            searchValue: "",
            seller: "TheSeller"
        })

        expect(res.url_generated!.includes('/seller/TheSeller/')).toBe(true)
        expect(res.url_generated!.includes('/sell/')).toBe(false)
        expect(res.url_generated!.includes('/mywants')).toBe(false)
        expect(res.url_generated!.includes('/profile')).toBe(true)
        done()
    }, timeout)

    test('should return good params with user\'s wantlist search against user\'s selling items', async (done) => {
        const res: IOutputSuccess = await service.search({
            searchType: EType.USER,
            searchValue: "TheUser",
            seller: "TheSeller"
        })

        const params = url.parse(res.url_generated!, true)?.query
        expect(res.url_generated!.includes('/seller/TheSeller/')).toBe(true)
        expect(res.url_generated!.includes('/sell/')).toBe(false)
        expect(res.url_generated!.includes('/mywants')).toBe(true)
        expect(res.url_generated!.includes('/profile')).toBe(false)
        expect(params.user).toBe("TheUser")
        done()
    }, timeout)
})