import { describe, test } from 'node:test'
import assert from 'node:assert'
import { DiscogsMarketplace, type SearchResult } from '../src/index'
import Country from '../src/data/country.data'
import Currency, { type CurrencyValues } from '../src/data/currency.data'

void describe('Test scraper modules functionality', () => {
    void test('It should test legacy scraper indirectly through search', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'legacy',
            artistId: 244819,
            limit: 250,
        })

        // Verify urlGenerated
        assert.ok(typeof res.urlGenerated === 'string', 'urlGenerated should be a string')
        assert.ok(res.urlGenerated.includes('/sell/list'), 'urlGenerated should include /sell/list')

        validateSearchResult(res)
    })

    void test('It should test modern scraper indirectly through search', async () => {
        const res = await DiscogsMarketplace.search({
            api: 'v2',
            artistIds: [244819],
            limit: 250,
        })

        // Verify urlGenerated
        assert.ok(typeof res.urlGenerated === 'string', 'urlGenerated should be a string')
        assert.ok(res.urlGenerated.includes('shop-page-api/sell_item'), 'urlGenerated should include shop-page-api/sell_item')

        validateSearchResult(res)
    })
})

const validateSearchResult = (res: SearchResult) => {
    // Helper functions for validation
    const validCountryCodes = Object.values(Country)
    const validCurrencyCodes = Object.values(Currency)

    const isValidCountryCode = (code: string): boolean => {
        return validCountryCodes.includes(code as (typeof validCountryCodes)[number])
    }

    const isValidPriceFormat = (price: string): boolean => {
        // Pattern: number (with optional decimals) + space + currency code
        const pricePattern = /^[\d,]+\.?\d*\s+[A-Z]{3}$/
        return pricePattern.test(price)
    }

    const isValidCurrencyInPrice = (price: string): boolean => {
        const currencyCode = price.split(' ').pop()
        return currencyCode ? validCurrencyCodes.includes(currencyCode as CurrencyValues) : false
    }

    const isNonEmptyString = (value: string): boolean => {
        return typeof value === 'string' && value.length > 0
    }

    // Verify SearchResult interface structure
    assert.ok(Array.isArray(res.items), 'items should be an array')
    assert.ok(res.items.length >= 0, 'items array should exist')

    // Verify page structure
    assert.ok(typeof res.page === 'object', 'page should be an object')
    assert.ok(typeof res.page.current === 'number', 'page.current should be a number')
    assert.ok(typeof res.page.total === 'number', 'page.total should be a number')

    // Verify result structure
    assert.ok(typeof res.result === 'object', 'result should be an object')
    assert.ok(typeof res.result.total === 'number', 'result.total should be a number')
    assert.ok(typeof res.result.perPage === 'number', 'result.perPage should be a number')

    // Verify item structure for each item
    res.items.forEach((item, itemIndex) => {
        assert.ok(item, `item at index ${itemIndex} should exist`)

        // Basic properties - required and non-empty
        assert.ok(typeof item.id === 'number', `item.id at index ${itemIndex} should be a number`)
        assert.ok(isNonEmptyString(item.title), `item.title at index ${itemIndex} should be a non-empty string`)
        assert.ok(isNonEmptyString(item.url), `item.url at index ${itemIndex} should be a non-empty string`)
        assert.ok(
            item.description === null || isNonEmptyString(item.description),
            `item.description at index ${itemIndex} should be null or non-empty string`,
        )
        assert.ok(typeof item.isAcceptingOffer === 'boolean', `item.isAcceptingOffer at index ${itemIndex} should be a boolean`)
        assert.ok(typeof item.isAvailable === 'boolean', `item.isAvailable at index ${itemIndex} should be a boolean`)

        // Nullable properties
        assert.ok(item.listedAt === null || item.listedAt instanceof Date, `item.listedAt at index ${itemIndex} should be null or Date`)
        assert.ok(
            item.imageUrl === null || isNonEmptyString(item.imageUrl),
            `item.imageUrl at index ${itemIndex} should be null or non-empty string`,
        )

        // Artist array validation
        assert.ok(Array.isArray(item.artists), `item.artists at index ${itemIndex} should be an array`)
        item.artists.forEach((artist, artistIndex) => {
            assert.ok(artist, `artist at index ${artistIndex} for item ${itemIndex} should exist`)
            assert.ok(
                artist.id === null || typeof artist.id === 'number',
                `artist.id at index ${artistIndex} for item ${itemIndex} should be null or number`,
            )
            assert.ok(
                isNonEmptyString(artist.name),
                `artist.name at index ${artistIndex} for item ${itemIndex} should be a non-empty string`,
            )
            assert.ok(
                artist.url === null || isNonEmptyString(artist.url),
                `artist.url at index ${artistIndex} for item ${itemIndex} should be null or non-empty string`,
            )
        })

        // Release validation
        assert.ok(typeof item.release === 'object', `item.release at index ${itemIndex} should be an object`)
        assert.ok(typeof item.release.id === 'number', `item.release.id at index ${itemIndex} should be a number`)
        assert.ok(isNonEmptyString(typeof item.release.name), `item.release.name at index ${itemIndex} should be a non-empty string`)
        assert.ok(isNonEmptyString(typeof item.release.url), `item.release.url at index ${itemIndex} should be a non-empty string`)

        // Formats array validation
        assert.ok(Array.isArray(item.formats), `item.formats at index ${itemIndex} should be an array`)
        item.formats.forEach((format, formatIndex) => {
            assert.ok(isNonEmptyString(format), `format at index ${formatIndex} for item ${itemIndex} should be a non-empty string`)
        })

        // Labels array validation
        assert.ok(Array.isArray(item.labels), `item.labels at index ${itemIndex} should be an array`)
        item.labels.forEach((label, labelIndex) => {
            assert.ok(label, `label at index ${labelIndex} for item ${itemIndex} should exist`)
            assert.ok(typeof label.id === 'number', `label.id at index ${labelIndex} for item ${itemIndex} should be a number`)
            assert.ok(isNonEmptyString(label.name), `label.name at index ${labelIndex} for item ${itemIndex} should be a non-empty string`)
            assert.ok(isNonEmptyString(label.url), `label.url at index ${labelIndex} for item ${itemIndex} should be a non-empty string`)
        })

        // Catnos array validation
        assert.ok(Array.isArray(item.catnos), `item.catnos at index ${itemIndex} should be an array`)
        item.catnos.forEach((catno, catnoIndex) => {
            assert.ok(isNonEmptyString(catno), `catno at index ${catnoIndex} for item ${itemIndex} should be a non-empty string`)
        })

        // Condition validation
        assert.ok(typeof item.condition === 'object', `item.condition at index ${itemIndex} should be an object`)
        assert.ok(typeof item.condition.media === 'object', `item.condition.media at index ${itemIndex} should be an object`)
        assert.ok(
            isNonEmptyString(item.condition.media.full),
            `item.condition.media.full at index ${itemIndex} should be a non-empty string`,
        )
        assert.ok(
            isNonEmptyString(item.condition.media.short),
            `item.condition.media.short at index ${itemIndex} should be a non-empty string`,
        )
        assert.ok(typeof item.condition.sleeve === 'object', `item.condition.sleeve at index ${itemIndex} should be an object`)
        assert.ok(
            item.condition.sleeve.full === null || isNonEmptyString(item.condition.sleeve.full),
            `item.condition.sleeve.full at index ${itemIndex} should be null or non-empty string`,
        )
        assert.ok(
            item.condition.sleeve.short === null || isNonEmptyString(item.condition.sleeve.short),
            `item.condition.sleeve.short at index ${itemIndex} should be null or non-empty string`,
        )

        // Seller validation
        assert.ok(typeof item.seller === 'object', `item.seller at index ${itemIndex} should be an object`)
        assert.ok(isNonEmptyString(item.seller.name), `item.seller.name at index ${itemIndex} should be a non-empty string`)
        assert.ok(isNonEmptyString(item.seller.url), `item.seller.url at index ${itemIndex} should be a non-empty string`)
        assert.ok(
            item.seller.score === null || isNonEmptyString(item.seller.score),
            `item.seller.score at index ${itemIndex} should be a non-empty string`,
        )
        assert.ok(
            item.seller.notes === null || typeof item.seller.notes === 'number',
            `item.seller.notes at index ${itemIndex} should be a number`,
        )

        // Price validation
        assert.ok(typeof item.price === 'object', `item.price at index ${itemIndex} should be an object`)
        assert.ok(isNonEmptyString(item.price.base), `item.price.base at index ${itemIndex} should be a non-empty string`)
        assert.ok(
            isValidPriceFormat(item.price.base),
            `item.price.base at index ${itemIndex} should have valid format (${item.price.base})`,
        )
        assert.ok(
            isValidCurrencyInPrice(item.price.base),
            `item.price.base at index ${itemIndex} should have valid currency (${item.price.base})`,
        )
        assert.ok(
            item.price.shipping === null || isNonEmptyString(item.price.shipping),
            `item.price.shipping at index ${itemIndex} should be null or non-empty string`,
        )
        if (item.price.shipping !== null) {
            assert.ok(
                isValidPriceFormat(item.price.shipping),
                `item.price.shipping at index ${itemIndex} should have valid format (${item.price.shipping})`,
            )
            assert.ok(
                isValidCurrencyInPrice(item.price.shipping),
                `item.price.shipping at index ${itemIndex} should have valid currency (${item.price.shipping})`,
            )
        }

        // Country validation
        assert.ok(typeof item.country === 'object', `item.country at index ${itemIndex} should be an object`)
        assert.ok(isNonEmptyString(item.country.name), `item.country.name at index ${itemIndex} should be a non-empty string`)
        assert.ok(isNonEmptyString(item.country.code), `item.country.code at index ${itemIndex} should be a non-empty string`)
        assert.ok(
            isValidCountryCode(item.country.code),
            `item.country.code at index ${itemIndex} should be a valid country code (${item.country.code})`,
        )

        // Community validation
        assert.ok(typeof item.community === 'object', `item.community at index ${itemIndex} should be an object`)
        assert.ok(typeof item.community.have === 'number', `item.community.have at index ${itemIndex} should be a number`)
        assert.ok(typeof item.community.want === 'number', `item.community.want at index ${itemIndex} should be a number`)
    })
}
