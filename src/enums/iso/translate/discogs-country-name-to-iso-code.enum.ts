/**
 * Convert country name from discogs to IsoCode
 * @example Get country that need to be translated
 * // Got to https://www.discogs.com/settings/seller/
 * // Take ECountryName and convert it as JS const (easier that way), and past it in console
 * // Run in console top get enum:
 * [...document.getElementById('seller-country').options]
 *  .map(x => x.value)
 *  .filter(x => x)
 *  .filter(x => !Object.values(ECountryName).includes(x))
 *  .reduce((a,b) => ({ ...a, [b]: null }), {})
 */
enum EDiscogsCountryNameToIsoCode {
    'Azerbaidjan' = 'AZ',
    'Bolivia' = 'BO',
    'Bosnia-Herzegovina' = 'BA',
    'Cape Verde' = 'CV',
    'Czech Republic' = 'CZ',
    'East Timor' = 'TL',
    'Falkland Islands' = 'FK',
    'Former Czechoslovakia' = 'CZ',
    'Former USSR' = 'RU',
    'France (European Territory)' = 'FR',
    'French Guyana' = 'GY',
    'Guadeloupe (French)' = 'GP',
    'Guam (USA)' = 'GU',
    'Guinea Bissau' = 'GW',
    'Heard and McDonald Islands' = 'HM',
    'Iran' = 'IR',
    "Ivory Coast (Cote D'Ivoire)" = 'CI',
    'Laos' = 'LA',
    'Macau' = 'MO',
    'Macedonia' = 'MK',
    'Martinique (French)' = 'MQ',
    'Micronesia' = 'FM',
    'Netherlands Antilles' = 'CW', // or SX
    'Neutral Zone' = 'IQ', // or SA
    'New Caledonia (French)' = 'NC',
    'Pitcairn Island' = 'PN',
    'Polynesia (French)' = 'PF',
    'Reunion (French)' = 'RE', //
    'S. Georgia & S. Sandwich Isls.' = 'GS',
    'Saint Helena' = 'SH',
    'Saint Kitts & Nevis Anguilla' = 'KN',
    'Saint Tome (Sao Tome) and Princi' = 'ST',
    'Saint Vincent & Grenadines' = 'VC',
    'Slovak Republic' = 'SK',
    'South Korea' = 'KR',
    'Spain (Canary Islands)' = 'IC', //
    'Svalbard and Jan Mayen Islands' = 'SJ',
    'Swaziland' = 'SZ',
    'Syria' = 'SY',
    'Tadjikistan' = 'TJ',
    'Taiwan' = 'TW',
    'Tanzania' = 'TZ',
    'United Kingdom' = 'GB',
    'Northern Ireland' = 'GB',
    'United Kingdom (Channel Islands)' = '',
    'United States' = 'US',
    'USA Minor Outlying Islands' = 'UM',
    'Vatican City State' = 'VA',
    'Venezuela' = 'VE',
    'Vietnam' = 'VN',
    'Virgin Islands (USA)' = 'VI',
    'Wallis and Futuna Islands' = 'WF',
    'Yugoslavia' = 'GR',
    'Zaire' = 'CD',
}

export default EDiscogsCountryNameToIsoCode
