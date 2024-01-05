/** @type {import('knip').KnipConfig} */
const config = {
    entry: ['src/index.ts', 'test/app.test.ts'],
    ignoreDependencies: ['@types/jest'],
}

export default config
