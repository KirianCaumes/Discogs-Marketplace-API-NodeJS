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
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['jsdoc'],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true } },
            { selector: 'enum', format: ['PascalCase'], custom: { regex: '^E[A-Z]', match: true } },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
            { selector: 'typeAlias', format: ['PascalCase'], suffix: ['Type', 'State', 'Props', 'Returns', 'Params'] },
        ],
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
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
        // 'capitalized-comments': ['warn', 'always'], // Not always usefull as it also fix comment with code
        camelcase: ['error', { allow: ['format_desc', 'ships_from'] }],
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
}
