import { describe, test } from 'node:test'
import assert from 'node:assert'
import { chromium } from 'patchright'
import search from '../src/search'

void describe('Test browserContext parameter in search', () => {
    void test('It should use provided browser context as is and not close it', async () => {
        // A regular Chrome, as a context is used as is
        const browser = await chromium.launch({ channel: 'chrome', headless: false })

        try {
            const context = await browser.newContext()
            const result = await search({ query: 'nirvana' }, context)
            const otherResult = await search({ query: 'metallica' }, context)

            assert.ok(result.items.length)
            assert.ok(otherResult.items.length)

            // Still open
            await (await context.newPage()).close()
        } finally {
            await browser.close()
        }
    })

    void test('It should create and close browser if browserContext is not provided', async () => {
        // The search function should create and close the browser itself
        const result = await search({ query: 'nirvana' })

        assert.ok(result)
        assert.ok(result.items)

        // No browser instance to check, but if no error thrown, browser was closed
    })
})
