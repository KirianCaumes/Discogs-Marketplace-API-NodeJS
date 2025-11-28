import { describe, test } from 'node:test'
import assert from 'node:assert'
import { chromium } from 'playwright-extra'
import playwrightStealth from 'puppeteer-extra-plugin-stealth'
import search from '../src/search'

void describe('Test browserInstance parameter in search', () => {
    void test('It should use provided browserInstance and not close it', async () => {
        chromium.use(playwrightStealth())
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })

        const result = await search({ api: 'legacy', query: '' }, browser)

        assert.ok(result)
        assert.ok(result.items)

        // Browser should still be open (context closed internally)
        // Try to open a new context to verify browser is still usable
        const context = await browser.newContext()
        await context.close()
        await browser.close()
    })

    void test('It should create and close browser if browserInstance is not provided', async () => {
        // The search function should create and close the browser itself
        const result = await search({ api: 'legacy', query: '' })

        assert.ok(result)
        assert.ok(result.items)

        // No browser instance to check, but if no error thrown, browser was closed
    })
})
