# Discogs Marketplace API NodeJS

[![NPM Version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs?logo=npm&color=CB3837)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs) ![GitHub Repo stars](https://img.shields.io/github/stars/KirianCaumes/Discogs-Marketplace-API-NodeJS?style=flat&logo=github&label=Stars&color=%23181717) [![GitHub License](https://img.shields.io/github/license/KirianCaumes/Discogs-Marketplace-API-NodeJS?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI%2FPg0KPHN2ZyBmaWxsPSIjZmZmIiBhcmlhLWhpZGRlbj0idHJ1ZSIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgZGF0YS12aWV3LWNvbXBvbmVudD0idHJ1ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgPg0KICAgIDxwYXRoIGQ9Ik04Ljc1Ljc1VjJoLjk4NWMuMzA0IDAgLjYwMy4wOC44NjcuMjMxbDEuMjkuNzM2Yy4wMzguMDIyLjA4LjAzMy4xMjQuMDMzaDIuMjM0YS43NS43NSAwIDAgMSAwIDEuNWgtLjQyN2wyLjExMSA0LjY5MmEuNzUuNzUgMCAwIDEtLjE1NC44MzhsLS41My0uNTMuNTI5LjUzMS0uMDAxLjAwMi0uMDAyLjAwMi0uMDA2LjAwNi0uMDA2LjAwNS0uMDEuMDEtLjA0NS4wNGMtLjIxLjE3Ni0uNDQxLjMyNy0uNjg2LjQ1QzE0LjU1NiAxMC43OCAxMy44OCAxMSAxMyAxMWE0LjQ5OCA0LjQ5OCAwIDAgMS0yLjAyMy0uNDU0IDMuNTQ0IDMuNTQ0IDAgMCAxLS42ODYtLjQ1bC0uMDQ1LS4wNC0uMDE2LS4wMTUtLjAwNi0uMDA2LS4wMDQtLjAwNHYtLjAwMWEuNzUuNzUgMCAwIDEtLjE1NC0uODM4TDEyLjE3OCA0LjVoLS4xNjJjLS4zMDUgMC0uNjA0LS4wNzktLjg2OC0uMjMxbC0xLjI5LS43MzZhLjI0NS4yNDUgMCAwIDAtLjEyNC0uMDMzSDguNzVWMTNoMi41YS43NS43NSAwIDAgMSAwIDEuNWgtNi41YS43NS43NSAwIDAgMSAwLTEuNWgyLjVWMy41aC0uOTg0YS4yNDUuMjQ1IDAgMCAwLS4xMjQuMDMzbC0xLjI4OS43MzdjLS4yNjUuMTUtLjU2NC4yMy0uODY5LjIzaC0uMTYybDIuMTEyIDQuNjkyYS43NS43NSAwIDAgMS0uMTU0LjgzOGwtLjUzLS41My41MjkuNTMxLS4wMDEuMDAyLS4wMDIuMDAyLS4wMDYuMDA2LS4wMTYuMDE1LS4wNDUuMDRjLS4yMS4xNzYtLjQ0MS4zMjctLjY4Ni40NUM0LjU1NiAxMC43OCAzLjg4IDExIDMgMTFhNC40OTggNC40OTggMCAwIDEtMi4wMjMtLjQ1NCAzLjU0NCAzLjU0NCAwIDAgMS0uNjg2LS40NWwtLjA0NS0uMDQtLjAxNi0uMDE1LS4wMDYtLjAwNi0uMDA0LS4wMDR2LS4wMDFhLjc1Ljc1IDAgMCAxLS4xNTQtLjgzOEwyLjE3OCA0LjVIMS43NWEuNzUuNzUgMCAwIDEgMC0xLjVoMi4yMzRhLjI0OS4yNDkgMCAwIDAgLjEyNS0uMDMzbDEuMjg4LS43MzdjLjI2NS0uMTUuNTY0LS4yMy44NjktLjIzaC45ODRWLjc1YS43NS43NSAwIDAgMSAxLjUgMFptMi45NDUgOC40NzdjLjI4NS4xMzUuNzE4LjI3MyAxLjMwNS4yNzNzMS4wMi0uMTM4IDEuMzA1LS4yNzNMMTMgNi4zMjdabS0xMCAwYy4yODUuMTM1LjcxOC4yNzMgMS4zMDUuMjczczEuMDItLjEzOCAxLjMwNS0uMjczTDMgNi4zMjdaIj48L3BhdGg%2BDQo8L3N2Zz4%3D&logoColor=fff&label=License)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![Support this project](https://img.shields.io/badge/Support%20this%20project-003087?logo=PayPal&logoColor=fff)](https://www.paypal.me/KirianCaumes)

Another (better ?) NodeJs library to fetch data from Discogs marketplace. 💿

## 📂 Installation (with npm)

This library works with two different `strategies` to scrape data: with a classic HTTP fetch request (Axios) or by creating a new instance of a browser (Playwright). Take a look at the "[About strategies](#-about-strategies)" chapter to learn more.

Run the following command in your project:

```sh
npm install discogs-marketplace-api-nodejs

# Or to avoid installing Playwright
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install discogs-marketplace-api-nodejs
```

## ▶️ Quick Start

Import `DiscogsMarketplace` into your project:

```js
// With ECMAScript 6 and +
import { DiscogsMarketplace } from 'discogs-marketplace-api-nodejs'

// With CommonJS
const DiscogsMarketplace = require('discogs-marketplace-api-nodejs').DiscogsMarketplace
```

## 🤔 Examples

- Get top 250 items, of the 2nd page, filtered by Rock, listed by newest, for a given artist

```js
// https://www.discogs.com/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock
const result = await DiscogsMarketplace.search({
    limit: 250,
    page: 2,
    genre: 'Rock',
    sort: 'Listed Newest',
    searchType: 'artist_id',
    searchValue: 244819,
})
```

- Get top 50 items, of the 1st page, listed by price lowest, on a user wantlist

```js
// https://www.discogs.com/sell/mywants?limit=50&user=Kirian_&sort=price,asc
const result = await DiscogsMarketplace.search({
    limit: 50,
    page: 1,
    sort: 'Price Lowest',
    searchType: 'user',
    searchValue: 'Kirian_',
})
```

- Get top 25 items, of the 1st page, listed by seller A-Z, on a release

```js
// https://www.discogs.com/sell/release/767931?sort=seller,asc&limit=25&page=1
const result = await DiscogsMarketplace.search({
    sort: 'Seller A-Z',
    page: 1,
    searchType: 'release_id',
    searchValue: '767931',
})
```

- Get top 100 items, of the 1st page, listed by newest, on a string search

```js
// https://www.discogs.com/sell/list?sort=listed,desc&limit=100&q=in+flames&page=1
const result = await DiscogsMarketplace.search({
    limit: 100,
    page: 1,
    sort: 'Listed Newest',
    searchType: 'q',
    searchValue: 'in flames',
})
```

- Get top 25 items, of the 1st page, listed by newest, on a seller inventory

```js
// https://www.discogs.com/seller/Kirian_/profile?sort=listed,desc&limit=25&page=1
const result = await DiscogsMarketplace.search({
    sort: 'Listed Newest',
    page: 1,
    searchType: 'q',
    searchValue: '',
    seller: 'Kirian_',
})
```

- Get top 25 items, of the 1st page, listed by newest, on a user wantlist, on a seller inventory

```js
// https://www.discogs.com/seller/Kirian_/mywants?sort=listed,desc&limit=25&user=Kirian_&page=1
const result = await DiscogsMarketplace.search({
    sort: 'Listed Newest',
    page: 1,
    searchType: 'user',
    searchValue: 'Kirian_',
    seller: 'Kirian_',
})
```

## 🤠 About strategies

> Which `strategy` should I choose?

This project provides two ways to scrape data:

- `fetch` (default): Get the result with a classic HTTP fetch request (Axios).
  - For the moment, this is the simplest and fastest solution to choose.
- `browser`: Get the result by creating a new instance of a browser (Playwright) to scrape the page.
  - This can help bypass Cloudflare (or other) protection for some cases.
  - Slightly slower than `fetch` (see [benchmarks](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/releases/tag/v1.8.1))

**Both strategies will give you the exact same result.**

I choose to maintain this two solutions, because over time Discogs is changing: one day they activated a protection that prevented a `fetch` solution from working, so I implemented to `browser` solution. But a few days later, they disabled that protection and the original solution became the best again.

With both strategies, you are free to choose the one that suits you!

```js
const result = await DiscogsMarketplace.search({
    // ...
    strategy: 'fetch' // or 'browser'
})
```

## 📃 Data format

You can provide parameters to `DiscogsMarketplace.search` function according to this interface:

```ts
interface InputInterface {
    /**
     * Type of elements to search.
     * Default to `q`.
     * | Name       | Description                |
     * |:---------: |:--------------------------:|
     * | q          | Basic query search         |
     * | master_id  | Search in a master release |
     * | release_id | Search in a release        |
     * | label_id   | Search in a label          |
     * | artist_id  | Search in a artist         |
     * | user       | Search in user wantlist    |
     */
    searchType: SearchTypeType
    /**
     * Value to search corresponding to searchType
     */
    searchValue?: string | number
    /**
     * Currency
     */
    currency?: CurrencyType
    /**
     * Genre
     */
    genre?: GenreType
    /**
     * Styles
     */
    style?: Array<StyleType>
    /**
     * Formats
     */
    format?: Array<FormatType>
    /**
     * Format descriptions
     */
    formatDescription?: Array<FormatDescriptionType>
    /**
     * Media conditions
     */
    condition?: Array<ConditionType>
    /**
     * Year (Do not use it with `years`)
     */
    year?: number
    /**
     * Interval of years (Do not use it with `year`)
     */
    years?: {
        /** Min */
        min: number
        /** Max */
        max: number
    }
    /**
     * Is audio sample ?
     */
    isAudioSample?: boolean
    /**
     * Is make an offer only ?
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country
     */
    from?: FromType
    /**
     * Seller name
     */
    seller?: string
    /**
     * Sort elements by.
     * Default to `Listed Newest`.
     */
    sort?: SortType
    /**
     * Limit of elements to search (25 | 50 | 100 | 250).
     * Default to `25`.
     */
    limit?: LimitType
    /**
     * Page (Must be < 401 or discogs will return an error 404).
     * Default to `1`.
     */
    page?: number
    /**
     * Lang to use for Discogs.
     * Default to `en`.
     */
    lang?: LangType
    /**
     * Strategy to scrape data:
     * - `fetch` (default): Get the result with a classic HTTP fetch request (Axios).
     * - `browser`: Get the result by creating a new instance of a browser (Playwright) to scrape the page. This can help bypass Cloudflare (or other) protection for some cases.
     */
    strategy?: 'fetch' | 'browser'
}
```

If success, it will return:

```ts
interface OutputSuccessInterface {
    items: Array<{
        id: number
        title: {
            original: string
            artist: string
            item: string
            formats: Array<string>
        }
        url: string
        labels: Array<string>
        catnos: Array<string>
        imageUrl: string
        description: string
        isAcceptingOffer: boolean
        isAvailable: boolean
        condition: {
            media: {
                full: string
                short: string
            }
            sleeve: {
                full: string
                short: string
            }
        }
        seller: {
            name: string
            url: string
            score: string
            notes: number
        }
        price: {
            base: string
            shipping: string
        }
        country: {
            name: string
            code: string
        }
        community: {
            have: number
            want: number
        }
        release: {
            id: number
            url: string
        }
    }>
    page: {
        current: number
        total: number
    }
    result: {
        total: number
        perPage: number
    }
    search: {
        value: string | number
        type: SearchTypeType
    }
    urlGenerated: string
}
```

If error, it will throw:

```ts
interface OutputErrorInterface {
    message: string
    code: number
}
```

## 💡 How to contribute

There is a [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) on that project already configured, feel free to use it.

Install dependencies with:

```sh
npm install
```

You can open a pull request with your new additions.

## 🐛 Known issues/problems

### Linkedom

If you are using this library on a Typescript project, you might encounter issues with `linkedom`.

To fix it, use this in command line: `--skipLibCheck` or add that in you `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### Playwright

Install system dependencies:

```sh
sudo npx playwright install-deps chromium
```

More information [here](https://playwright.dev/docs/browsers#install-system-dependencies).

👉 If you find another problem, feel free to open an issue.
