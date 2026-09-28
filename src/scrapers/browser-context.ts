import { chromium } from 'patchright'
import type { Browser, BrowserContext } from 'patchright'

/**
 * Run a function in a headless browser context suited to call Discogs, closing what it opened afterwards.
 * JavaScript is disabled and the User-Agent is the one of the Discogs apps, which Cloudflare lets through.
 * @param browserInstance Browser to use, launched and closed here when not provided
 * @param fn Function to run
 * @returns Result of the function
 */
export default async function withBrowserContext<T>(
    browserInstance: Browser | undefined,
    fn: (browserContext: BrowserContext) => Promise<T>,
): Promise<T> {
    const browser = browserInstance ?? (await chromium.launch({ headless: true, chromiumSandbox: false }))

    try {
        const browserContext = await browser.newContext({ javaScriptEnabled: false, userAgent: 'Discogs' })

        try {
            return await fn(browserContext)
        } finally {
            await browserContext.close()
        }
    } finally {
        if (!browserInstance) {
            await browser.close()
        }
    }
}
