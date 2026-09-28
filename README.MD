# 🎧 Discogs Marketplace API NodeJS

[![NPM Version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs?logo=npm&color=CB3837)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs) ![GitHub Repo stars](https://img.shields.io/github/stars/KirianCaumes/Discogs-Marketplace-API-NodeJS?style=flat&logo=github&label=Stars&color=%23181717) [![GitHub License](https://img.shields.io/github/license/KirianCaumes/Discogs-Marketplace-API-NodeJS?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI%2FPg0KPHN2ZyBmaWxsPSIjZmZmIiBhcmlhLWhpZGRlbj0idHJ1ZSIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgZGF0YS12aWV3LWNvbXBvbmVudD0idHJ1ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgPg0KICAgIDxwYXRoIGQ9Ik04Ljc1Ljc1VjJoLjk4NWMuMzA0IDAgLjYwMy4wOC44NjcuMjMxbDEuMjkuNzM2Yy4wMzguMDIyLjA4LjAzMy4xMjQuMDMzaDIuMjM0YS43NS43NSAwIDAgMSAwIDEuNWgtLjQyN2wyLjExMSA0LjY5MmEuNzUuNzUgMCAwIDEtLjE1NC44MzhsLS41My0uNTMuNTI5LjUzMS0uMDAxLjAwMi0uMDAyLjAwMi0uMDA2LjAwNi0uMDA2LjAwNS0uMDEuMDEtLjA0NS4wNGMtLjIxLjE3Ni0uNDQxLjMyNy0uNjg2LjQ1QzE0LjU1NiAxMC43OCAxMy44OCAxMSAxMyAxMWE0LjQ5OCA0LjQ5OCAwIDAgMS0yLjAyMy0uNDU0IDMuNTQ0IDMuNTQ0IDAgMCAxLS42ODYtLjQ1bC0uMDQ1LS4wNC0uMDE2LS4wMTUtLjAwNi0uMDA2LS4wMDQtLjAwNHYtLjAwMWEuNzUuNzUgMCAwIDEtLjE1NC0uODM4TDEyLjE3OCA0LjVoLS4xNjJjLS4zMDUgMC0uNjA0LS4wNzktLjg2OC0uMjMxbC0xLjI5LS43MzZhLjI0NS4yNDUgMCAwIDAtLjEyNC0uMDMzSDguNzVWMTNoMi41YS43NS43NSAwIDAgMSAwIDEuNWgtNi41YS43NS43NSAwIDAgMSAwLTEuNWgyLjVWMy41aC0uOTg0YS4yNDUuMjQ1IDAgMCAwLS4xMjQuMDMzbC0xLjI4OS43MzdjLS4yNjUuMTUtLjU2NC4yMy0uODY5LjIzaC0uMTYybDIuMTEyIDQuNjkyYS43NS43NSAwIDAgMS0uMTU0LjgzOGwtLjUzLS41My41MjkuNTMxLS4wMDEuMDAyLS4wMDIuMDAyLS4wMDYuMDA2LS4wMTYuMDE1LS4wNDUuMDRjLS4yMS4xNzYtLjQ0MS4zMjctLjY4Ni40NUM0LjU1NiAxMC43OCAzLjg4IDExIDMgMTFhNC40OTggNC40OTggMCAwIDEtMi4wMjMtLjQ1NCAzLjU0NCAzLjU0NCAwIDAgMS0uNjg2LS40NWwtLjA0NS0uMDQtLjAxNi0uMDE1LS4wMDYtLjAwNi0uMDA0LS4wMDR2LS4wMDFhLjc1Ljc1IDAgMCAxLS4xNTQtLjgzOEwyLjE3OCA0LjVIMS43NWEuNzUuNzUgMCAwIDEgMC0xLjVoMi4yMzRhLjI0OS4yNDkgMCAwIDAgLjEyNS0uMDMzbDEuMjg4LS43MzdjLjI2NS0uMTUuNTY0LS4yMy44NjktLjIzaC45ODRWLjc1YS43NS43NSAwIDAgMSAxLjUgMFptMi45NDUgOC40NzdjLjI4NS4xMzUuNzE4LjI3MyAxLjMwNS4yNzNzMS4wMi0uMTM4IDEuMzA1LS4yNzNMMTMgNi4zMjdabS0xMCAwYy4yODUuMTM1LjcxOC4yNzMgMS4zMDUuMjczczEuMDItLjEzOCAxLjMwNS0uMjczTDMgNi4zMjdaIj48L3BhdGg%2BDQo8L3N2Zz4%3D&logoColor=fff&label=License)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![Support this project](https://img.shields.io/badge/Support%20this%20project-003087?logo=PayPal&logoColor=fff)](https://www.paypal.me/KirianCaumes)

A modern TypeScript/Node.js client for scraping and retrieving Discogs Marketplace listings — flexible, type safe, and easy to use. 💿
> 💪 No Discogs API token required — this client scrapes public Marketplace data.

## 🚀 Installation

```sh
npm install discogs-marketplace-api-nodejs

# Because we use Patchright (an undetected Playwright fork) to scrape the data, you may also need to run:
# npx patchright install --with-deps chromium
```

The searches go through the API of the Discogs shop (`https://www.discogs.com/shop/list`), from a headless browser.

You can also pass your own [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright) browser as second parameter of `search`. You then manage its lifecycle.

```ts
import { chromium } from 'patchright'

const browser = await chromium.launch({ headless: true })
const result = await DiscogsMarketplace.search({ artistIds: [244819] }, browser)
await browser.close()
```

## ⚡ Quick Start

```ts
import { DiscogsMarketplace } from 'discogs-marketplace-api-nodejs'

const result = await DiscogsMarketplace.search({
    artistIds: [244819],
    genres: ['Rock'],
    sort: 'price,asc',
    limit: 50,
})

console.log(result.items)
```

## 📚 Usage Examples

### 1. Get 250 latest listings by a specific artist in the Rock genre, then the next 250

Discogs paginates with cursors: each result gives the `nextCursor` to pass as `after` to get the next page.

```ts
// https://www.discogs.com/shop/list?artist=244819&genre=Rock&sort=date-listed&sortOrder=descending&size=250
const firstPage = await DiscogsMarketplace.search({
    artistIds: [244819],
    genres: ['Rock'],
    sort: 'listed,desc',
    limit: 250,
})

if (firstPage.nextCursor) {
    const secondPage = await DiscogsMarketplace.search({
        artistIds: [244819],
        genres: ['Rock'],
        sort: 'listed,desc',
        limit: 250,
        after: firstPage.nextCursor,
    })
}
```

### 2. Go through several pages with the cursor

```ts
import { DiscogsMarketplace, type SearchResult } from 'discogs-marketplace-api-nodejs'

const items: SearchResult['items'] = []
let after: string | undefined

do {
    const result = await DiscogsMarketplace.search({ artistIds: [244819], limit: 250, after })
    items.push(...result.items)
    after = result.nextCursor ?? undefined
} while (after && items.length < 1000) // Stop after 1000 items, or at the last page
```

### 3. Get listings of a user's wantlist, sorted by price, limit 50

Get the release IDs of the wantlist, then search them as `releaseIds` (at most 2000). You can keep the IDs on your side to reuse them in the next searches.

```ts
// https://www.discogs.com/shop/mywants
// Every release of the wantlist, from the Discogs API (no browser needed)
const releaseIds = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_')
// Or only the ones currently for sale, from the wantlist page (fewer IDs to search)
const releaseIdsForSale = await DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { onlyForSale: true })

// An empty list means no filter, as for every other filter: there is nothing to search if the wantlist is empty
if (releaseIdsForSale.length) {
    const result = await DiscogsMarketplace.search({
        releaseIds: releaseIdsForSale,
        sort: 'price,asc',
        limit: 50,
    })
}
```

### 4. Get listings on a release, sorted by seller name

```ts
// https://www.discogs.com/shop/list?release=767931&sort=seller&sortOrder=ascending
const result = await DiscogsMarketplace.search({
    releaseIds: [767931],
    sort: 'seller,asc',
})
```

### 5. Get listings by a general search query (e.g., "in flames"), sorted by newest listings, limit 100

```ts
// https://www.discogs.com/shop/list?q=in+flames&sort=date-listed&sortOrder=descending&size=100
const result = await DiscogsMarketplace.search({
    query: 'in flames',
    sort: 'listed,desc',
    limit: 100,
})
```

### 6. Get newest listings of a user's wantlist, on a seller inventory

```ts
// The seller ID can be found via the Discogs API: https://api.discogs.com/users/Kirian_
const result = await DiscogsMarketplace.search({
    sort: 'listed,desc',
    releaseIds: await DiscogsMarketplace.getWantlistReleaseIds('Kirian_', { onlyForSale: true }),
    sellerIds: [6562907],
})
```

### 7. Get listings with photos, by a general search query (e.g., "red"), on a master release

```ts
// https://www.discogs.com/shop/list?q=red&master=2167270&hasItemPhotos=true
const result = await DiscogsMarketplace.search({
    query: 'red',
    masterIds: [2167270],
    hasItemPhotos: true,
})
```

## 🧩 API Reference

### `DiscogsMarketplace.search(searchParams, browserInstance?)`

| Field                   | Type                  | Description                                    | Example                           | Default         |
|-------------------------|-----------------------|------------------------------------------------|-----------------------------------|-----------------|
| `query`                 | `string`              | Search string.                                 | `'in flames'`                     | –               |
| `artistIds`             | `number[]`            | Filter by artist IDs.                          | `[244819]`                        | –               |
| `labelIds`              | `number[]`            | Filter by label IDs.                           | `[11499]`                         | –               |
| `masterIds`             | `number[]`            | Filter by master release IDs.                  | `[33474]`                         | –               |
| `releaseIds`            | `number[]`            | Filter by release IDs (at most 2000).          | `[12345, 67890]`                  | –               |
| `sellerIds`             | `number[]`            | Filter by seller IDs.                          | `[6562907]`                       | –               |
| `genres`                | `Genre[]`             | Filter by genres.                              | `['Rock', 'Jazz']`                | –               |
| `styles`                | `Style[]`             | Filter by styles.                              | `['Death Metal', 'Heavy Metal']`  | –               |
| `formats`               | `Format[]`            | Filter by formats.                             | `['Vinyl', 'CD']`                 | –               |
| `formatDescriptions`    | `FormatDescription[]` | Filter by format descriptions.                 | `['Limited Edition', 'Numbered']` | –               |
| `mediaConditions`       | `Condition[]`         | Filter by media conditions.                    | `['Mint (M)']`                    | –               |
| `sleeveConditions`      | `SleeveCondition[]`   | Filter by sleeve conditions.                   | `['Mint (M)', 'Generic']`         | –               |
| `from`                  | `From[]`              | Filter by seller’s countries.                  | `['FR', 'DE']`                    | –               |
| `currencies`            | `Currency[]`          | Filter by currencies.                          | `['USD', 'EUR']`                  | –               |
| `priceRange.min`/`max`  | `number`              | Filter by price range.                         | `{ min: 10, max: 100 }`           | –               |
| `years.min`/`max`       | `number`              | Filter by year range.                          | `{ min: 1980, max: 1990 }`        | –               |
| `sellerRatingMin`       | `number (0–100)`      | Minimum seller rating (unrated sellers kept).  | `99`                              | `0`             |
| `sellerRatingCountMin`  | `number`              | Minimum number of seller ratings.              | `50`                              | `0`             |
| `isMakeAnOfferOnly`     | `boolean`             | Only return listings that accept offers.       | –                                 | `false`         |
| `hasItemPhotos`         | `boolean`             | Only return listings with photos of the item.  | –                                 | `false`         |
| `hideGenericSleeves`    | `boolean`             | Hide generic sleeves.                          | –                                 | `false`         |
| `hideSleevelessMedia`   | `boolean`             | Hide sleeveless media.                         | –                                 | `false`         |
| `showUnavailable`       | `boolean`             | Show unavailable items.                        | –                                 | `true`          |
| `sort`                  | `Sort`                | Sort and sort order (see below).               | `'price,asc'`                     | `'listed,desc'` |
| `limit`                 | `number`              | Number of results per page (at most 250).      | `100`                             | `25`            |
| `after`                 | `string`              | Cursor of the page, from `nextCursor`.         | –                                 | –               |

`sort` is a field followed by `asc` or `desc` (e.g. `'price,asc'`), the field being one of `listed`, `condition` (media), `sleeveCondition`, `artist`, `title`, `year`, `releaseCountry`, `seller`, `sellerRating`, `sellerRatingCount`, `shipsFrom` or `price`.

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
            year: number | null
            country: string | null
            rating: number | null
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
        photos: Array<string>
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
            id: number
            name: string
            url: string
            score: string | null
            notes: number | null
            isIndependent: boolean
        }
        price: {
            /** @example '12.34 USD' */
            base: `${number} ${Currency}`
            /** @example '5.67 USD' */
            shipping: `${number} ${Currency}` | null
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
    total: number
    nextCursor: string | null
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

- Some search parameters might not be compatible with every type of queries.
- For other edge cases, feel free to open an [issue on GitHub](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/issues).

## 📃 License

Licensed under [MIT](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE).
