# Discogs Marketplace API NodeJS &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KirianCaumes/Discogs-Marketplace-API-NodeJS/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/discogs-marketplace-api-nodejs.svg?style=flat)](https://www.npmjs.com/package/discogs-marketplace-api-nodejs)

Another (better ?) NodeJs library to fetch data from Discog's marketplace

## Usage

### Install

```sh
npm install discogs-marketplace-api-nodejs
```

### Import and search

In Typescript

```ts
import DiscogsMarketplace, { EType, IOutputSuccess, IOutputError } from 'discogs-marketplace-api-nodejs'

DiscogsMarketplace.search({ searchType: EType.ARTIST, searchValue: 244819 })
    .then((res: IOutputSuccess) => {
        console.log(res)
    })
    .catch((err: IOutputError) => {
        console.error(err)
    })
```

In plain Javascript

```js
const DiscogsMarketplace = require('discogs-marketplace-api-nodejs').default
const { EType } = require('discogs-marketplace-api-nodejs')

DiscogsMarketplace.search({ searchType: EType.ARTIST, searchValue: 244819 })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
```

### Data format

Data that must provided to the search function must looks like this (other interfaces can be found in "*lib/enum*" ) :

```ts
interface IInput {
    /**
     * Type of elements to search
     */
    searchType: EType,
    /**
     * Value to search corresponding to searchType
     */
    searchValue: string | number | undefined,
    /**
     * Currency
     */
    currency?: ECurrency,
    /**
     * Genre
     */
    genre?: EGenre,
    /**
     * Styles
     */
    style?: EStyle[]
    /**
     * Formats
     */
    format?: EFormat[]
    /**
     * Format descriptions
     */
    formatDescription?: EFormatDescription[]
    /**
     * Media conditions
     */
    mediaCondition?: EMediaCondition[]
    /**
     * Year (Do not use it with years)
     */
    year?: number,
    /**
     * Interval of years (Do not use it with year)
     */
    years?: IYears,
    /**
     * Is audio sample ?
     */
    isAudioSample?: boolean,
    /**
     * Is make an offer only ?
     */
    isMakeAnOfferOnly?: boolean,
    /**
     * Expedition country
     */
    from?: EFrom,
    /**
     * Seller name
     */
    seller?: string,
    /**
     * Sort elements by
     */
    sort?: ESort,
    /**
     * Limit of elements to search (25 | 50 | 100 | 250)
     */
    limit?: TLimit,
    /**
     * Page (Must be < 401 or discogs will return an error 404)
     */
    page?: number,
    /**
     * Lang to use for Discogs
     */
    lang?: ELang
}
```

If success, it will return :

```ts
interface IOutputSuccess {
    result: IItem[],
    page: {
        current: number,
        total: number
    },
    item: {
        total: number,
        perPage: number,
    },
    search: {
        value: string | number,
        type: EType
    },
    urlGenerated: string,
}

interface IItem {
    title: {
        original: string,
        artist: string,
        item: string,
    },
    url: string,
    labels: string[],
    catnos: string[],
    imageUrl: string,
    description: string,
    isAcceptingOffer: boolean,
    isAvailable: boolean,
    condition: {
        media: {
            full: string,
            short: string
        },
        sleeve: {
            full: string,
            short: string
        }
    },
    seller: {
        name: string,
        score: string,
        notes: string
    },
    price: {
        base: string,
        shipping: string,
    },
    from: {
        countryName: string,
        isoCountryName: string,
        isoCode: string,
    },
    community: {
        have: number,
        want: number
    },
    releaseUrl: string
}
```

If error, it will throw :

```ts
interface IOutputError {
    message: string,
    code: number
}
```
