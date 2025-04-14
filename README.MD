# Discogs Marketplace API NodeJS

[![NPM Version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs?logo=npm&color=CB3837)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs) ![GitHub Repo stars](https://img.shields.io/github/stars/KirianCaumes/Discogs-Marketplace-API-NodeJS?style=flat&logo=github&label=Stars&color=%23181717) [![GitHub License](https://img.shields.io/github/license/KirianCaumes/Discogs-Marketplace-API-NodeJS?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI%2FPg0KPHN2ZyBmaWxsPSIjZmZmIiBhcmlhLWhpZGRlbj0idHJ1ZSIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgZGF0YS12aWV3LWNvbXBvbmVudD0idHJ1ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgPg0KICAgIDxwYXRoIGQ9Ik04Ljc1Ljc1VjJoLjk4NWMuMzA0IDAgLjYwMy4wOC44NjcuMjMxbDEuMjkuNzM2Yy4wMzguMDIyLjA4LjAzMy4xMjQuMDMzaDIuMjM0YS43NS43NSAwIDAgMSAwIDEuNWgtLjQyN2wyLjExMSA0LjY5MmEuNzUuNzUgMCAwIDEtLjE1NC44MzhsLS41My0uNTMuNTI5LjUzMS0uMDAxLjAwMi0uMDAyLjAwMi0uMDA2LjAwNi0uMDA2LjAwNS0uMDEuMDEtLjA0NS4wNGMtLjIxLjE3Ni0uNDQxLjMyNy0uNjg2LjQ1QzE0LjU1NiAxMC43OCAxMy44OCAxMSAxMyAxMWE0LjQ5OCA0LjQ5OCAwIDAgMS0yLjAyMy0uNDU0IDMuNTQ0IDMuNTQ0IDAgMCAxLS42ODYtLjQ1bC0uMDQ1LS4wNC0uMDE2LS4wMTUtLjAwNi0uMDA2LS4wMDQtLjAwNHYtLjAwMWEuNzUuNzUgMCAwIDEtLjE1NC0uODM4TDEyLjE3OCA0LjVoLS4xNjJjLS4zMDUgMC0uNjA0LS4wNzktLjg2OC0uMjMxbC0xLjI5LS43MzZhLjI0NS4yNDUgMCAwIDAtLjEyNC0uMDMzSDguNzVWMTNoMi41YS43NS43NSAwIDAgMSAwIDEuNWgtNi41YS43NS43NSAwIDAgMSAwLTEuNWgyLjVWMy41aC0uOTg0YS4yNDUuMjQ1IDAgMCAwLS4xMjQuMDMzbC0xLjI4OS43MzdjLS4yNjUuMTUtLjU2NC4yMy0uODY5LjIzaC0uMTYybDIuMTEyIDQuNjkyYS43NS43NSAwIDAgMS0uMTU0LjgzOGwtLjUzLS41My41MjkuNTMxLS4wMDEuMDAyLS4wMDIuMDAyLS4wMDYuMDA2LS4wMTYuMDE1LS4wNDUuMDRjLS4yMS4xNzYtLjQ0MS4zMjctLjY4Ni40NUM0LjU1NiAxMC43OCAzLjg4IDExIDMgMTFhNC40OTggNC40OTggMCAwIDEtMi4wMjMtLjQ1NCAzLjU0NCAzLjU0NCAwIDAgMS0uNjg2LS40NWwtLjA0NS0uMDQtLjAxNi0uMDE1LS4wMDYtLjAwNi0uMDA0LS4wMDR2LS4wMDFhLjc1Ljc1IDAgMCAxLS4xNTQtLjgzOEwyLjE3OCA0LjVIMS43NWEuNzUuNzUgMCAwIDEgMC0xLjVoMi4yMzRhLjI0OS4yNDkgMCAwIDAgLjEyNS0uMDMzbDEuMjg4LS43MzdjLjI2NS0uMTUuNTY0LS4yMy44NjktLjIzaC45ODRWLjc1YS43NS43NSAwIDAgMSAxLjUgMFptMi45NDUgOC40NzdjLjI4NS4xMzUuNzE4LjI3MyAxLjMwNS4yNzNzMS4wMi0uMTM4IDEuMzA1LS4yNzNMMTMgNi4zMjdabS0xMCAwYy4yODUuMTM1LjcxOC4yNzMgMS4zMDUuMjczczEuMDItLjEzOCAxLjMwNS0uMjczTDMgNi4zMjdaIj48L3BhdGg%2BDQo8L3N2Zz4%3D&logoColor=fff&label=License)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![Support this project](https://img.shields.io/badge/Support%20this%20project-003087?logo=PayPal&logoColor=fff)](https://www.paypal.me/KirianCaumes)

Another (better ?) NodeJs library to fetch data from Discogs marketplace. 💿

## 📂 Installation (with npm)

Run the following command in your project:

```sh
npm i discogs-marketplace-api-nodejs
```

## ▶️ Quick Start

Import `DiscogsMarketplace` into your project:

```js
import { DiscogsMarketplace } from 'discogs-marketplace-api-nodejs'
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

- If you are making a lot of requests, you can pass a playwright page instance to reuse it:

```js
const browser = await playwright.launch()
const browserContext = await browser.newContext()
const browserPage = await browserContext.newPage()

const result = await DiscogsMarketplace.search({ searchType: 'q'}, browserPage)

await browserContext.close()
await browser.close()
```

## 📃 Data format

You can provide parameters to `DiscogsMarketplace.search` function according to this interface:

```ts
interface SearchParams {
    /**
     * Type of elements to search.
     * | Name       | Description                |
     * |:---------: |:--------------------------:|
     * | q          | Basic query search         |
     * | master_id  | Search in a master release |
     * | release_id | Search in a release        |
     * | label_id   | Search in a label          |
     * | artist_id  | Search in a artist         |
     * | user       | Search in user wantlist    |
     * @default 'q'
     */
    searchType: Search
    /**
     * Value to search corresponding to the search type
     */
    searchValue?: string | number
    /**
     * Currency
     * @example 'USD'
     */
    currency?: Currency
    /**
     * Genre
     * @example 'Rock'
     */
    genre?: Genre
    /**
     * Styles
     * @example ['Death Metal', 'Heavy Metal']
     */
    style?: Array<Style>
    /**
     * Formats
     * @example ['Vinyl', 'CD']
     */
    format?: Array<Format>
    /**
     * Format descriptions
     * @example ['Limited Edition', 'Numbered']
     */
    formatDescription?: Array<FormatDescription>
    /**
     * Media conditions
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    condition?: Array<Condition>
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
     * @default false
     */
    isAudioSample?: boolean
    /**
     * Is make an offer only ?
     * @default false
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country
     * @example 'US'
     */
    from?: From
    /**
     * Seller name
     */
    seller?: string
    /**
     * Sort elements by.
     * @default 'Listed Newest'
     */
    sort?: Sort
    /**
     * Limit of elements to search (25 | 50 | 100 | 250).
     * @default 25
     */
    limit?: Limit
    /**
     * Page (Must be < 401 or discogs will return an error 404).
     * @default 1
     */
    page?: number
    /**
     * Lang to use for Discogs.
     * @default 'en'
     */
    lang?: Lang
}
```

If success, it will return:

```ts
interface SearchResult {
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
            /** @example '12.34 USD' */
            base: `${number} ${CurrencyValues}` | ''
            /** @example '5.67 USD' */
            shipping: `${number} ${CurrencyValues}` | ''
        }
        country: {
            name: string
            /** @example 'US' */
            code: CountryValues
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
    urlGenerated: string
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

### Playwright

Install system dependencies:

```sh
sudo npx playwright install-deps chromium
```

More information [here](https://playwright.dev/docs/browsers#install-system-dependencies).

👉 If you find another problem, feel free to open an issue.
