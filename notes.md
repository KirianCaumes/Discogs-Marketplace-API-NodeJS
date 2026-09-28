# Notes

## Get the values Discogs expects

The filters of `MarketplaceSearch` only match the exact values of Discogs, and an unknown value silently returns no result.
Its `facetCounts` give these values, for the listings currently for sale. Go to <https://www.discogs.com/shop/list> and
run this in the console, to get the values of a dimension (e.g. `genre`, `currency`, `formatName`, `formatDescription`,
`mediaCondition`, `sleeveCondition`, `shipsFrom`, `shipsFromRegion`):

```js
const facets = async dimension => {
    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            operationName: 'MarketplaceSearch',
            variables: { first: 1, filter: { showUnavailable: true } },
            extensions: { persistedQuery: { version: 1, sha256Hash: '7ce2bd7801f216b0999648d626c935fc86c8fd85e562529bd87b690c974f08c2' } },
        }),
    })
    const { data } = await res.json()
    return data.marketplaceSearch.facetCounts.find(x => x.dimensionName === dimension).facets.map(x => x.facetName).sort()
}

console.log(`"${(await facets('genre')).join('" | "')}"`)
```

A facet lists at most 100 values (the most common ones), and only the values with listings: use the pages below to get
the full lists.

## Get list of Genre

Run `facets('genre')` (see above), or go to <https://www.discogs.com/release/edit/9999999> and run:

```js
console.log(`"${[...document.querySelectorAll('ul.genres li')].map(x => x.textContent).sort().join('" | "')}"`)
```

## Get list of Currencies

Run `facets('currency')` (see above).

## Get list of Countries

The names must be the ones of Discogs (e.g. "United States", not "United States of America"), check them with
`facets('shipsFrom')` (see above). Go to <https://www.discogs.com/settings/buyer> and run:

```js
console.log(`"${[...document.querySelectorAll('#country option')].map(x => x.textContent).sort().join('" | "')}"`)
```

## Get list of Styles

Go to <https://www.discogs.com/shop/list> and run, then paste the result in `src/data/style.data.ts`:

```js
const { data } = await (await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ operationName: 'Styles', variables: {}, extensions: { persistedQuery: { version: 1, sha256Hash: '4c514376b334ff2363ebf0c1b137de12d315ea16f6d492d20e46c89e7116843d' } } }) })).json()
const styles = data.styles.reduce((acc, x) => ({ ...acc, [x.name]: [...(acc[x.name] ?? []), String(x.discogsId)] }), {})
console.log(JSON.stringify(Object.fromEntries(Object.entries(styles).sort(([a], [b]) => a.localeCompare(b)))))
```

## Get list of Formats

Run `facets('formatName')` (see above), or go to <https://www.discogs.com/release/edit/9999999> and run:

```js
console.log(`"${[...document.querySelectorAll('#release-format-select option')].map(x => x.textContent).sort().join('" | "')}"`)
```

## Get list of Formats Descriptions

Run `facets('formatDescription')` (see above, limited to 100 values), or go to <https://www.discogs.com/release/edit/9999999> and run:

```js
const data = []
// cspell: disable-next-line
// Execute the following format and execute following script: Select Vinyl Format, Pathé Disc, Edison Disc, Cylinder, CD, CDV, DVD, HD DVD, Blu-Ray, Ultra HD Blu-Ray, SACD, 4-Track Cartridge, Cassette, DC-International, Reel-to-reel, Sabamobil, Betacam, Film Reel, HitClips, Laserdisc, SelectaVision
document.querySelectorAll('.format_descriptions label span').forEach(x => data.push(x.textContent))
// Then
console.log(`'${data.filter((value, index, self) => self.indexOf(value) === index).sort().join("' | '")}'`)
```

## Get list of Conditions

Run `facets('mediaCondition')` and `facets('sleeveCondition')` (see above). The filters take these labels, but the
listings return them as an enum (e.g. `VERY_GOOD_PLUS`), mapped back in `CONDITIONS` of `src/scrapers/marketplace.scraper.ts`.

## Get list of Sorts

The sort dimensions of `MarketplaceSearch` are listed in `SORT_DIMENSIONS` of `src/scrapers/marketplace.scraper.ts`.
The Discogs shop only offers some of them (see `SORT_SLUGS`): the others were found by trying names, an unknown one
returns an error. The label sort does not exist anymore.

## Update the persisted queries

The GraphQL queries are persisted on Discogs side, and called by their hash (`HASHES` of
`src/scrapers/marketplace.scraper.ts`). If Discogs changes a query, its hash changes and the search fails: go to
<https://www.discogs.com/shop/list>, open the network tab of the devtools, and read the new `sha256Hash` in the
`extensions` of the `graphql?operationName=MarketplaceSearch` request.

The filters the shop sends are built by the function which reads the url parameters, in its main bundle
(`/shop/list/assets/index-*.js`, search for `genreAnd`). It shows every filter the shop uses, but the API supports a few
more (`currency`, `sellerRatingMin`, `sellerRatingCountMin`).
