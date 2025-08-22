# 🎧 Discogs Marketplace API NodeJS

[![NPM Version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs?logo=npm&color=CB3837)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs) ![GitHub Repo stars](https://img.shields.io/github/stars/KirianCaumes/Discogs-Marketplace-API-NodeJS?style=flat&logo=github&label=Stars&color=%23181717) [![GitHub License](https://img.shields.io/github/license/KirianCaumes/Discogs-Marketplace-API-NodeJS?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI%2FPg0KPHN2ZyBmaWxsPSIjZmZmIiBhcmlhLWhpZGRlbj0idHJ1ZSIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgZGF0YS12aWV3LWNvbXBvbmVudD0idHJ1ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgPg0KICAgIDxwYXRoIGQ9Ik04Ljc1Ljc1VjJoLjk4NWMuMzA0IDAgLjYwMy4wOC44NjcuMjMxbDEuMjkuNzM2Yy4wMzguMDIyLjA4LjAzMy4xMjQuMDMzaDIuMjM0YS43NS43NSAwIDAgMSAwIDEuNWgtLjQyN2wyLjExMSA0LjY5MmEuNzUuNzUgMCAwIDEtLjE1NC44MzhsLS41My0uNTMuNTI5LjUzMS0uMDAxLjAwMi0uMDAyLjAwMi0uMDA2LjAwNi0uMDA2LjAwNS0uMDEuMDEtLjA0NS4wNGMtLjIxLjE3Ni0uNDQxLjMyNy0uNjg2LjQ1QzE0LjU1NiAxMC43OCAxMy44OCAxMSAxMyAxMWE0LjQ5OCA0LjQ5OCAwIDAgMS0yLjAyMy0uNDU0IDMuNTQ0IDMuNTQ0IDAgMCAxLS42ODYtLjQ1bC0uMDQ1LS4wNC0uMDE2LS4wMTUtLjAwNi0uMDA2LS4wMDQtLjAwNHYtLjAwMWEuNzUuNzUgMCAwIDEtLjE1NC0uODM4TDEyLjE3OCA0LjVoLS4xNjJjLS4zMDUgMC0uNjA0LS4wNzktLjg2OC0uMjMxbC0xLjI5LS43MzZhLjI0NS4yNDUgMCAwIDAtLjEyNC0uMDMzSDguNzVWMTNoMi41YS43NS43NSAwIDAgMSAwIDEuNWgtNi41YS43NS43NSAwIDAgMSAwLTEuNWgyLjVWMy41aC0uOTg0YS4yNDUuMjQ1IDAgMCAwLS4xMjQuMDMzbC0xLjI4OS43MzdjLS4yNjUuMTUtLjU2NC4yMy0uODY5LjIzaC0uMTYybDIuMTEyIDQuNjkyYS43NS43NSAwIDAgMS0uMTU0LjgzOGwtLjUzLS41My41MjkuNTMxLS4wMDEuMDAyLS4wMDIuMDAyLS4wMDYuMDA2LS4wMTYuMDE1LS4wNDUuMDRjLS4yMS4xNzYtLjQ0MS4zMjctLjY4Ni40NUM0LjU1NiAxMC43OCAzLjg4IDExIDMgMTFhNC40OTggNC40OTggMCAwIDEtMi4wMjMtLjQ1NCAzLjU0NCAzLjU0NCAwIDAgMS0uNjg2LS40NWwtLjA0NS0uMDQtLjAxNi0uMDE1LS4wMDYtLjAwNi0uMDA0LS4wMDR2LS4wMDFhLjc1Ljc1IDAgMCAxLS4xNTQtLjgzOEwyLjE3OCA0LjVIMS43NWEuNzUuNzUgMCAwIDEgMC0xLjVoMi4yMzRhLjI0OS4yNDkgMCAwIDAgLjEyNS0uMDMzbDEuMjg4LS43MzdjLjI2NS0uMTUuNTY0LS4yMy44NjktLjIzaC45ODRWLjc1YS43NS43NSAwIDAgMSAxLjUgMFptMi45NDUgOC40NzdjLjI4NS4xMzUuNzE4LjI3MyAxLjMwNS4yNzNzMS4wMi0uMTM4IDEuMzA1LS4yNzNMMTMgNi4zMjdabS0xMCAwYy4yODUuMTM1LjcxOC4yNzMgMS4zMDUuMjczczEuMDItLjEzOCAxLjMwNS0uMjczTDMgNi4zMjdaIj48L3BhdGg%2BDQo8L3N2Zz4%3D&logoColor=fff&label=License)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![Support this project](https://img.shields.io/badge/Support%20this%20project-003087?logo=PayPal&logoColor=fff)](https://www.paypal.me/KirianCaumes)

A modern TypeScript/Node.js client for scraping and retrieving Discogs Marketplace listings — flexible, type safe, and easy to use. 💿
> 💪 No Discogs API token required — this client scrapes public Marketplace data.

## 🚀 Installation

```sh
npm install discogs-marketplace-api-nodejs
```

## ⚡ Quick Start

```ts
import { DiscogsMarketplace } from 'discogs-marketplace-api-nodejs'

const result = await DiscogsMarketplace.search({
  searchType: 'artist_id',
  searchValue: 244819,
  genre: 'Rock',
  sort: 'price,asc',
  limit: 50,
  page: 1,
})

console.log(result.items)
```

## 📚 Usage Examples

### 1. Get 250 latest listings by a specific artist in the Rock genre, page 2

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock
const result = await DiscogsMarketplace.search({
    searchType: 'artist_id',
    searchValue: 244819,
    genre: 'Rock',
    sort: 'listed,desc',
    limit: 250,
    page: 2,
})
```

### 2. Get listings of a user's wantlist, sorted by price, limit 50

```ts
// https://www.discogs.com/sell/mywants?limit=50&user=Kirian_&sort=price,asc
const result = await DiscogsMarketplace.search({
    limit: 50,
    sort: 'price,asc',
    searchType: 'user',
    searchValue: 'Kirian_',
})
```

### 3. Get listings on a release, sorted by seller name

```ts
// https://www.discogs.com/sell/list?release_id=767931&sort=seller,asc&limit=25
// https://www.discogs.com/sell/release/767931?sort=seller,asc&limit=25
const result = await DiscogsMarketplace.search({
    searchType: 'release_id',
    searchValue: '767931',
    sort: 'seller,asc',
})
```

### 4. Get listings by a general search query (e.g., "in flames"), sorted by newest listings, limit 100

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&limit=100&q=in+flames&page=1
const result = await DiscogsMarketplace.search({
    searchType: 'q',
    searchValue: 'in flames',
    sort: 'listed,desc',
    limit: 100,
})
```

### 5. Get newest listings on a seller inventory

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&seller=Kirian_
// https://www.discogs.com/seller/Kirian_/profile?sort=listed,desc
const result = await DiscogsMarketplace.search({
    sort: 'listed,desc',
    searchType: 'q',
    seller: 'Kirian_',
})
```

### 6. Get newest listings of a user's wantlist, on a seller inventory

```ts
// https://www.discogs.com/sell/mywants?sort=listed,desc&seller=Kirian_&user=Kirian_
// https://www.discogs.com/seller/Kirian_/mywants?sort=listed,desc&user=Kirian_
const result = await DiscogsMarketplace.search({
    sort: 'listed,desc',
    searchType: 'user',
    searchValue: 'Kirian_',
    seller: 'Kirian_',
})
```

## 💁 Additional Features

### 1. Extract correct parameters from URL

```ts
const searchParams = DiscogsMarketplace.getSearchParamsFromUrl('https://www.discogs.com/fr/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock')
// {
//     searchType: 'artist_id',
//     searchValue: '244819',
//     genre: 'Rock',
//     sort: 'listed,desc',
//     limit: 250,
//     page: 2,
//     lang: 'fr',
// }
```

## 🧩 API Reference

The `DiscogsMarketplace.search` function accepts parameters defined by the following interface:

```ts
interface SearchParams {
    /**
     * The type of element to search.
     * | Value       | Description                    |
     * |-------------|--------------------------------|
     * | `q`         | Basic query search             |
     * | `master_id` | Search within a master release |
     * | `release_id`| Search within a release        |
     * | `label_id`  | Search within a label          |
     * | `artist_id` | Search by artist               |
     * | `user`      | Search a user's wantlist       |
     * @default 'q'
     */
    searchType: Search
    /**
     * The search value corresponding to the selected `searchType`.
     */
    searchValue?: string | number
    /**
     * Currency code for price filtering.
     * @example 'USD'
     */
    currency?: Currency
    /**
     * Genre filter.
     * @example 'Rock'
     */
    genre?: Genre
    /**
     * List of styles.
     * @example ['Death Metal', 'Heavy Metal']
     */
    style?: Array<Style>
    /**
     * List of formats.
     * @example ['Vinyl', 'CD']
     */
    format?: Array<Format>
    /**
     * List of format descriptions.
     * @example ['Limited Edition', 'Numbered']
     */
    formatDescription?: Array<FormatDescription>
    /**
     * List of media conditions.
     * @example ['Mint (M)', 'Very Good Plus (VG+)']
     */
    condition?: Array<Condition>
    /**
     * Release year.
     * Do not use together with `years`.
     */
    year?: number
    /**
     * Range of years.
     * Do not use together with `year`.
     */
    years?: {
        /** Minimum year */
        min: number
        /** Maximum year */
        max: number
    }
    /**
     * If true, only listings that accept offers are returned.
     * @default false
     */
    isMakeAnOfferOnly?: boolean
    /**
     * Expedition country filter (2-letter country code).
     * @example 'US'
     */
    from?: From
    /**
     * Seller's username filter.
     */
    seller?: string
    /**
     * Hours range for wantlist searches.
     * @example '0-24'
     */
    hoursRange?: HoursRange
    /**
     * Sort order for the results.
     * @default 'listed,desc'
     */
    sort?: Sort
    /**
     * Number of results to return per page.
     * Allowed values: 25, 50, 100, 250.
     * @default 25
     */
    limit?: Limit
    /**
     * Page number of results.
     * Must be less than 401 to avoid Discogs 404 errors.
     * @default 1
     */
    page?: number
    /**
     * Language code for Discogs interface.
     * @default 'en'
     */
    lang?: Lang
}
```

On success, it returns a result matching this interface:

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

## 🛠️ Development & Contribution

- Clone the repo and use the included devcontainer/VSCode setup.
- Run: `npm install`
- Add your contribution.
- Use `npm test` to run unit tests.
- Open a pull request with your new additions! 🎉

## 👉 Known Issues

- Requests hitting page >400 will result in a 404.
- Some search parameters might not be compatible with every type of queries.
- For other edge cases, feel free to open an [issue on GitHub](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/issues).

## 📃 License

Licensed under [MIT](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE).
