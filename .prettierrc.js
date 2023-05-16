/**
 * {@link https://prettier.io/docs/en/configuration.html} Documentation
 * @type {import('prettier').Config}
 */
module.exports = {
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    printWidth: 140,
    quoteProps: 'as-needed',
    trailingComma: 'all',
    arrowParens: 'avoid',
    singleAttributePerLine: true,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
}
