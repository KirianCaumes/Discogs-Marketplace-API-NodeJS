import { chromium } from 'patchright'
import type { Browser, BrowserContext } from 'patchright'

/**
 * Get the browser options of a regular Chrome of the same version as the browser, as its default User-Agent and
 * `sec-ch-ua` header give away the headless mode ("HeadlessChrome").
 * @param browser Browser
 * @returns User-Agent, in the reduced form of Chrome ("Chrome/153.0.0.0"), and `sec-ch-ua` header
 */
async function getChromeIdentity(browser: Browser): Promise<{
    /** User-Agent */
    userAgent: string
    /** Headers */
    extraHTTPHeaders: Record<string, string>
}> {
    const session = await browser.newBrowserCDPSession()

    try {
        const { userAgent } = await session.send('Browser.getVersion')
        const [major] = browser.version().split('.')

        return {
            userAgent: userAgent.replace(/HeadlessChrome\/[\d.]+/, `Chrome/${major ?? ''}.0.0.0`),
            extraHTTPHeaders: { 'sec-ch-ua': `"Google Chrome";v="${major ?? ''}", "Not_A Brand";v="8", "Chromium";v="${major ?? ''}"` },
        }
    } finally {
        await session.detach()
    }
}

/**
 * Run a function in a headless browser context suited to call Discogs, closing what it opened afterwards.
 * It looks like a regular Chrome with JavaScript enabled, which Cloudflare lets through more often than the User-Agent
 * of the Discogs apps without JavaScript, especially from datacenter IPs.
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
        const browserContext = await browser.newContext(await getChromeIdentity(browser))

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
