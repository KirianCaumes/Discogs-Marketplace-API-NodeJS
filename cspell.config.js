/**
 * {@link https://cspell.org/configuration/document-settings/} Documentation
 * @type {import('cspell').Settings}
 */
module.exports = {
    version: '0.2',
    language: 'en',
    ignorePaths: ['settings.json', 'devcontainer.json', 'node_modules/**', 'build/**', 'dist/**'],
    ignoreWords: ['Kirian_', 'KirianCaumes', 'knip'],
    words: [
        'discogs',
        'wantlist',
        'catnos',
        'devcontainer',
        'gitmojis',
        'mywants',
        'camelcase',
        'texttrack',
        'domcontentloaded',
        'PJAX',
        'localtime',
        'lintstagedrc',
    ],
}
