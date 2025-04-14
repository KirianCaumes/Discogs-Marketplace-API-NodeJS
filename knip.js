/** @type {import('knip').KnipConfig} */
const config = {
    entry: ['src/index.ts', 'test/app.test.ts'],
    ignoreDependencies: ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-import-resolver-typescript'],
}

export default config
