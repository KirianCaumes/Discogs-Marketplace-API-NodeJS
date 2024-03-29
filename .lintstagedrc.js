/**
 * {@link https://github.com/okonet/lint-staged#configuration} Documentation
 * @type {import('lint-staged').Config}
 */
module.exports = {
    '*.{ts,tsx,js,jsx}': ['prettier --ignore-unknown', 'eslint', 'cspell --no-progress --no-must-find-files'],
    '*.{html,json,svg,yml,xml}': ['prettier --ignore-unknown', 'cspell --no-progress --no-must-find-files'],
}
