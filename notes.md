# Notes

## Gest list of Genre

Go to <https://www.discogs.com/release/edit/9999999> and run:

```js
console.log(`"${[...document.querySelectorAll('ul.genres li')].map(x => x.textContent).sort().join('" | "')}"`)
```

## Get list of Currencies

Go to <https://www.discogs.com/sell/list?q=#more%3Dcurrency> and run:

```js
console.log(`"${[...document.querySelectorAll('.marketplace_filters_currency a')].map(x => new URLSearchParams(x.href).get('currency')).sort().join('" | "')}"`)
```

## Get list of Countries

Go to <https://www.discogs.com/settings/buyer> and run:

```js
console.log(`"${[...document.querySelectorAll('#country option')].map(x => x.textContent).sort().join('" | "')}"`) 
```

## Get list of Styles

Go to <https://www.discogs.com/release/edit/9999999>, toggle all the genre and run:

```js
console.log(`"${[...document.querySelectorAll('#release-styles option')].map(x => x.textContent).sort().join('" | "')}"`) 
```

## Get list of Formats

Go to <https://www.discogs.com/release/edit/9999999> and run:

```js
console.log(`"${[...document.querySelectorAll('#release-format-select option')].map(x => x.textContent).sort().join('" | "')}"`)
```

## Get list of Formats Descriptions

Go to <https://www.discogs.com/release/edit/9999999> and run:

```js
const data = []
// Execute the following format and execute following script: Select Vinyl Format, Pathé Disc, Edison Disc, Cylinder, CD, CDV, DVD, HD DVD, Blu-Ray, Ultra HD Blu-Ray, SACD, 4-Track Cartridge, Cassette, DC-International, Reel-to-reel, Sabamobil, Betacam, Film Reel, HitClips, Laserdisc, SelectaVision
document.querySelectorAll('.format_descriptions label span').forEach(x => data.push(x.textContent))
// Then
console.log(`'${data.filter((value, index, self) => self.indexOf(value) === index).sort().join("' | '")}'`)
```

## Get list of Conditions

Go to <https://www.discogs.com/sell/list?q=#more%3Dcondition> and run:

```js
console.log(`"${[...document.querySelectorAll('.marketplace_filters_condition a')].map(x => new URLSearchParams(x.href).get('condition')).sort().join('" | "')}"`)
```

## Get list of Sorts

Go to <https://www.discogs.com/sell/list> and run:

```js
console.log(`"${[...document.querySelectorAll('#sort_top option')].map(x => x.textContent).sort().join('" | "')}"`)
```
