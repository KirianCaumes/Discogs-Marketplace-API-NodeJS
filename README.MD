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
    api: 'v2',
    artistIds: [244819],
    genres: ['Rock'],
    sort: 'price,asc',
    limit: 50,
    page: 1,
})

console.log(result.items)
```

## 📚 Usage Examples

This library offers two API modes to access Discogs Marketplace data. The required `api` parameter determines which endpoint to use:

- **`api: 'v2'`** (Modern JSON API) - Recommended for most use cases, offers advanced filtering
- **`api: 'legacy'`** (HTML scraping) - Required for certain search types and general queries

Each API has different capabilities and available parameters. See the [API Reference](#-api-reference) section for complete details.

### 1. Get 250 latest listings by a specific artist in the Rock genre, page 2

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&limit=250&artist_id=244819&page=2&genre=Rock
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    artistId: 244819,
    genre: 'Rock',
    sort: 'listed,desc',
    limit: 250,
    page: 2,
})
// OR
const result = await DiscogsMarketplace.search({
    api: 'v2',
    artistIds: [244819],
    genres: ['Rock'],
    sort: 'listed,desc',
    limit: 250,
    page: 2,
})
```

### 2. Get listings of a user's wantlist, sorted by price, limit 50

```ts
// https://www.discogs.com/shop/mywants
const result = await DiscogsMarketplace.search({
    api: 'v2',
    limit: 50,
    sort: 'price,asc',
    wantlist: 'Kirian_',
})
```

### 3. Get listings on a release, sorted by seller name

```ts
// https://www.discogs.com/sell/list?release_id=767931&sort=seller,asc&limit=25
// https://www.discogs.com/sell/release/767931?sort=seller,asc&limit=25
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    releaseId: 767931,
    sort: 'seller,asc',
})
// OR
const result = await DiscogsMarketplace.search({
    api: 'v2',
    releaseIds: [767931],
    sort: 'seller,asc',
})
```

### 4. Get listings by a general search query (e.g., "in flames"), sorted by newest listings, limit 100

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&limit=100&q=in+flames&page=1
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    query: 'in flames',
    sort: 'listed,desc',
    limit: 100,
})
```

### 5. Get newest listings on a seller inventory

```ts
// https://www.discogs.com/sell/list?sort=listed,desc&seller=Kirian_
// https://www.discogs.com/seller/Kirian_/profile?sort=listed,desc
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    sort: 'listed,desc',
    seller: 'Kirian_',
})
// OR
const result = await DiscogsMarketplace.search({
    api: 'v2',
    sort: 'listed,desc',
    sellerIds: [6562907],
})
```

### 6. Get newest listings of a user's wantlist, on a seller inventory

```ts
// https://www.discogs.com/seller/Kirian_/mywants?sort=listed,desc&user=Kirian_
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    sort: 'listed,desc',
    seller: 'Kirian_',
    user: 'Kirian_',
})
// OR
const result = await DiscogsMarketplace.search({
    api: 'v2',
    sort: 'listed,desc',
    wantlist: 'Kirian_',
    sellerIds: [6562907],
})
```

### 7. Get listings by a general search query (e.g., "red"), sorted by newest listings, on a master release

```ts
// https://www.discogs.com/sell/list?master_id=28291&q=red
const result = await DiscogsMarketplace.search({
    api: 'legacy',
    sort: 'listed,desc',
    masterId: 2167270,
    query: 'red',
})
```

## 🧩 API Reference

This library provides two different ways to search the Discogs Marketplace:

- **Modern API (`api: 'v2'`)** → JSON API, used by the Discogs "My Wants" page.
- **Legacy API (`api: 'legacy'`)** → HTML scraping, required for some cases.

Both share common search filters and extend them with API-specific options via the `SearchParams` interface.

### Modern API (`api: "v2"`), recommended for most use cases

| Field                   | Type                | Description                        | Example                 | Default |
|-------------------------|---------------------|------------------------------------|-------------------------|---------|
| `api`                   | `'v2'`              | Selects the modern API.            | `'v2'`                  | –       |
| `currencies`            | `Currency[]`        | Filter by multiple currencies.     | `['USD', 'EUR']`        | –       |
| `conditions`            | `Condition[]`       | List of media/sleeve conditions.   | `['Mint (M)']`          | –       |
| `genres`                | `Genre[]`           | Filter by multiple genres.         | `['Rock', 'Jazz']`      | –       |
| `from`                  | `From[]`            | Filter by seller’s countries.      | `['FR', 'DE']`          | –       |
| `sort`                  | `Sort`              | Sort and sort order.               | `'listed,desc'`         | `'listed,desc'` |
| `limit`                 | `number`            | Number of results per page.        | `100`                   | `25`    |
| `artistIds`             | `number[]`          | Filter by artist IDs.              | `[123, 456]`            | –       |
| `sellerIds`             | `number[]`          | Filter by seller IDs.              | `[789, 1011]`           | –       |
| `priceRange.min`/`max`  | `number`            | Filter by price range.             | `{ min: 10, max: 100 }` | –       |
| `sellerRatingMin`       | `number (0–100)`    | Minimum seller rating.             | `90`                    | `0`     |
| `hideGenericSleeves`    | `boolean`           | Hide generic sleeves.              | –                       | `false`  |
| `hideSleevelessMedia`   | `boolean`           | Hide sleeveless media.             | –                       | `false`  |
| `showUnavailable`       | `boolean`           | Show unavailable items.            | –                       | `true`  |
| `sellerRatingCountMin`  | `number`            | Minimum number of seller ratings.  | `50`                    | `0`     |
| `wantlist`*             | `string`            | Search by wantlist username.       | `"username"`            | –       |
| `releaseIds`*           | `number[]`          | Search by release IDs.             | `[12345, 67890]`        | –       |

\* Only **one** of `wantlist` or `releaseIds` can be used.

### Legacy API (`api: "legacy"`)

| Field        | Type            | Description                        | Example                        | Default |
|--------------|-----------------|------------------------------------|--------------------------------|---------|
| `api`        | `'legacy'`      | Selects the legacy API.            | `'legacy'`                     | –       |
| `query`      | `string`        | Search string.                     | `"something"`                  | –       |
| `currency`   | `Currency`      | Currency code for price filtering. | `'USD'`                        | –       |
| `condition`  | `Condition`     | Media/sleeve conditions.           | `'Mint (M)'`                   | –       |
| `genre`      | `Genre`         | Filter by genre.                   | `'Rock'`                       | –       |
| `styles`     | `Style[]`       | Filter by style.                   | `['Death Metal', 'Heavy Metal']` | –     |
| `from`       | `From`          | Filter by seller’s country.        | `'FR'`                         | –       |
| `sort`       | `Sort`          | Sort order for results.            | `'listed,desc'`                | `'listed,desc'` |
| `limit`      | `25 \| 50 \| 100 \| 250`     | Number of results per page.  | `100`                   | `25`    |
| `seller`     | `string`        | Filter by seller username.         | `"seller_name"`                | –       |
| `user`       | `string`        | Filter by user.                    | `"my_username"`                | –       |
| `lang`       | `Lang`          | Discogs interface language.        | `'en'`                         | `'en'`  |
| `masterId`*  | `number`        | Search by master release ID.       | `12345`                        | –       |
| `labelId`*   | `number`        | Search by label ID.                | `67890`                        | –       |
| `releaseId`* | `number`        | Search by release ID.              | `11111`                        | –       |
| `artistId`*  | `number`        | Search by artist ID.               | `22222`                        | –       |

\* Only **one** of `masterId`, `labelId`, `releaseId`, or `artistId` can be used.

### Common Parameters (all searches)

| Field                 | Type                         | Description                                    | Example                                | Default |
|-----------------------|------------------------------|------------------------------------------------|----------------------------------------|---------|
| `formats`             | `Format[]`                   | List of formats.                               | `['Vinyl', 'CD']`                      | –       |
| `formatDescriptions`  | `FormatDescription[]`        | List of format descriptions.                   | `['Limited Edition', 'Numbered']`      | –       |
| `years.min` / `max`   | `number`                     | Year range.                                    | `{ min: 1980, max: 1990 }`             | –       |
| `isMakeAnOfferOnly`   | `boolean`                    | Only return listings that accept offers.       | –                                      | `false` |
| `page`                | `number`                     | Page number (must be `< 401` to avoid 404).    | `2`                                    | `1`     |

On success, a `SearchResult` interface is returned:

```ts
interface SearchResult {
    items: Array<{
        id: number
        title: string
        artists: Array<{
            id: number | null
            name: string
            url: string | null
        }>
        release: {
            id: number
            name: string
            url: string
        }
        formats: Array<string>
        labels: Array<{
            id: number
            name: string
            url: string
        }>
        url: string
        listedAt: Date | null
        catnos: Array<string>
        imageUrl: string | null
        description: string | null
        isAcceptingOffer: boolean
        isAvailable: boolean
        condition: {
            media: {
                full: string
                short: string
            }
            sleeve: {
                full: string | null
                short: string | null
            }
        }
        seller: {
            name: string
            url: string
            score: string | null
            notes: number | null
        }
        price: {
            /** @example '12.34 USD' */
            base: `${number} ${CurrencyValues}`
            /** @example '5.67 USD' */
            shipping: `${number} ${CurrencyValues}` | null
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

- Requests hitting page >400 will result in a 404 on the legacy API.
- Some search parameters might not be compatible with every type of queries.
- For other edge cases, feel free to open an [issue on GitHub](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/issues).

## 📃 License

Licensed under [MIT](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE).
