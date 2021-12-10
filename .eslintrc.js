module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        node: true,
        jest: true,
    },
    root: true,
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/semi': ['warn', 'never'],
        '@typescript-eslint/indent': ['warn', 4],
        curly: ['warn', 'multi', 'consistent'],
        'max-len': ['warn', { code: 160 }],
        'comma-dangle': ['warn', 'always-multiline'],
        'nonblock-statement-body-position': ['warn', 'below'],
        'arrow-parens': ['warn', 'as-needed'],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
        'no-restricted-modules': ['error', { patterns: ['../*', './*'] }],
        'function-paren-newline': ['error', 'consistent'],
    },
};
