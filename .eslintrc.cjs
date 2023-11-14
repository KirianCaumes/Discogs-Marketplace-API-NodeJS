/**
 * {@link https://eslint.org/docs/latest/use/configure/configuration-files} Documentation
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        /**
         * Turns off all rules that are unnecessary or might conflict with Prettier.
         * Check conflict between Eslint and Prettier with: `npx eslint-config-prettier .eslintrc.js`.
         */
        'prettier',
    ],
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['jsdoc'],
    reportUnusedDisableDirectives: true,
    rules: {
        /** {@link https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections} */
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/naming-convention': [
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
            ...require('eslint-config-airbnb-typescript/lib/shared').rules['@typescript-eslint/naming-convention'],
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
        ],
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/consistent-type-imports': ['error'],
        /** {@link https://tkdodo.eu/blog/array-types-in-type-script} */
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        'jsdoc/require-jsdoc': [
            'warn',
            {
                checkConstructors: false,
                contexts: [
                    'ClassDeclaration',
                    'FunctionDeclaration',
                    'MethodDefinition',
                    { context: 'TSPropertySignature', inlineCommentBlock: true },
                ],
            },
        ],
        'jsdoc/require-description': [
            'warn',
            {
                checkConstructors: false,
                contexts: [
                    'TSPropertySignature',
                    'ClassDeclaration',
                    'ArrowFunctionExpression',
                    'FunctionDeclaration',
                    'FunctionExpression',
                    'MethodDefinition',
                ],
            },
        ],
        'jsdoc/require-param-description': ['warn', { contexts: ['any'] }],
        'jsdoc/require-param': ['warn', { checkDestructuredRoots: false }],
        'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'] }],
        'capitalized-comments': [
            'warn',
            'always',
            {
                ignorePattern: 'cspell',
            },
        ],
        camelcase: ['error'],
        'no-restricted-syntax': [
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
            ...require('eslint-config-airbnb-base/rules/style').rules['no-restricted-syntax'],
            {
                selector: 'TSEnumDeclaration',
                message:
                    "Do not declare Enum, prefer 'as const' assertions. See: https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums",
            },
        ],
        'no-underscore-dangle': ['error', { allow: ['_id', '_attributes', '__value__', '_text'] }],
        curly: ['warn', 'all'],
        'max-len': ['warn', { code: 160 }],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
        'no-restricted-modules': ['error', { patterns: ['../*', './*'] }],
        'no-extra-boolean-cast': ['error', { enforceForLogicalOperands: true }],
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }], // Must be at the end
    },
    overrides: [
        {
            files: ['./test/*.ts'],
            rules: {
                'no-restricted-imports': 'off',
            },
        },
        {
            files: ['./*.js'],
            rules: {
                indent: ['warn', 4],
            },
        },
    ],
    /** {@link https://github.com/import-js/eslint-plugin-import/issues/1485} */
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
