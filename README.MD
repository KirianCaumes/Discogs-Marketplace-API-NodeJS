# Discogs Marketplace API NodeJS &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs.svg?style=flat)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs)

Another (better ?) NodeJs library to fetch data from Discogs marketplace. 💿

## Installation (with npm)

Run the following command in your project:

```sh
npm install discogs-marketplace-api-nodejs
```

## Quick Start

Import `DiscogsMarketplace` into your project:

```js
// With ECMAScript 6 and +
import { DiscogsMarketplace } from 'discogs-marketplace-api-nodejs'

// With CommonJS
const DiscogsMarketplace = require('discogs-marketplace-api-nodejs').DiscogsMarketplace
```

## Examples

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
    searchType: 'release_id',
    searchValue: '767931',
})
```

- Get top 100 items, of the 1st page, listed by newest, on a string search

```js
// https://www.discogs.com/sell/list?sort=listed,desc&limit=100&q=in+flames&page=1
const result = await DiscogsMarketplace.search({
    limit: 100,
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
    searchType: 'user',
    searchValue: 'Kirian_',
    seller: 'Kirian_',
})
```

## Data format

You can provide parameters to `DiscogsMarketplace.search` function according to this type:

```ts
type InputType = {
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
    searchValue: string | number | undefined
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
    style?: StyleType[]
    /**
     * Formats
     */
    format?: FormatType[]
    /**
     * Format descriptions
     */
    formatDescription?: FormatDescriptionType[]
    /**
     * Media conditions
     */
    condition?: ConditionType[]
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
     * Sort elements by
     */
    sort?: SortType
    /**
     * Limit of elements to search (25 | 50 | 100 | 250)
     */
    limit?: LimitType
    /**
     * Page (Must be < 401 or discogs will return an error 404).
     * Default to `25`.
     */
    page?: number
    /**
     * Lang to use for Discogs.
     * Default to `en`.
     */
    lang?: LangType
}
```

If success, it will return:

```ts
type OutputSuccessType = {
    items: {
        id: number
        title: {
            original: string
            artist: string
            item: string
            formats: string[]
        }
        url: string
        labels: string[]
        catnos: string[]
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
            code: ECountryCode
        }
        community: {
            have: number
            want: number
        }
        release: {
            id: number
            url: string
        }
    }[]
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
type OutputErrorType = {
    message: string
    code: number
}
```

## How to contribute

There is a [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) on that project already configured, feel free to use it.

Install dependecies with:

```sh
npm install
```

You can open a pull request with your new additions.

## Know issues

### Linkedom

If you are using this librairy on a Typescript project, you might encounter issues with `linkedom`.

To fix it, use this in command line: `--skipLibCheck` or add that in you `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

If you found another problem, feel free to open an issue.
