const Currency = {
    $US: 'USD',
    US$: 'USD',
    USD: 'USD',
    '£GB': 'GBP',
    GBP: 'GBP',
    $CA: 'CAD',
    CA$: 'CAD',
    CAD: 'CAD',
    $AU: 'AUD',
    AU$: 'AUD',
    AUD: 'AUD',
    JPY: 'JPY',
    CHF: 'CHF',
    MX$: 'MXN',
    $MX: 'MXN',
    MXN: 'MXN',
    $NZ: 'NZD',
    NZ$: 'NZD',
    NZD: 'NZD',
    SEK: 'SEK',
    ZAR: 'ZAR',
    BRL: 'BRL',
    DKK: 'DKK',
    A$: 'AUD',
    R$: 'BRL',
    EUR: 'EUR',
    '€': 'EUR',
    $: 'USD',
    '£': 'GBP',
    '¥': 'JPY',
} as const

export type CurrencyType = typeof Currency
export type CurrencyKeys = keyof CurrencyType
export type CurrencyValues = CurrencyType[CurrencyKeys]

export default Currency
