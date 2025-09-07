import esJsdoc from 'eslint-plugin-jsdoc'
import esJs from '@eslint/js'
import esTs from 'typescript-eslint'
import esPrettier from 'eslint-config-prettier'
import esImport from 'eslint-plugin-import'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['client', 'dist'],
    },
    esJsdoc.configs['flat/recommended-typescript'],
    esJs.configs.recommended,
    ...esTs.configs.strictTypeChecked,
    ...esTs.configs.stylisticTypeChecked,
    esImport.flatConfigs.recommended,
    esPrettier,
    {
        settings: {
            // https://github.com/import-js/eslint-plugin-import/issues/1485#issuecomment-535351922
            'import/resolver': {
                typescript: {},
            },
        },
        languageOptions: {
            parserOptions: {
                project: ['tsconfig.json', 'tsconfig.build.json'],
            },
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            jsdoc: esJsdoc,
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
        },
        rules: {
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
                { selector: 'function', format: ['camelCase', 'PascalCase'] },
                { selector: 'typeLike', format: ['PascalCase'] },
                {
                    selector: 'variable',
                    types: ['boolean'],
                    format: ['PascalCase'],
                    prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'are'],
                },
            ],
            '@typescript-eslint/consistent-type-imports': ['error'],
            /** {@link https://tkdodo.eu/blog/array-types-in-type-script} */
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                { allowAny: false, allowBoolean: true, allowNullish: false, allowNumber: true, allowRegExp: false, allowNever: false },
            ],
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: {
                        arguments: false,
                        attributes: false,
                        properties: false,
                    },
                },
            ],
            '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
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
            'jsdoc/check-param-names': ['warn', { checkDestructured: false }],
            'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'] }],
            'no-console': ['warn'],
            'object-shorthand': ['error'],
            'no-extend-native': ['error'],
            'no-nested-ternary': 'error',
            'prefer-template': 'error',
            // 'capitalized-comments': ['warn', 'always', { ignorePattern: 'cspell|prettier' }],
            camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForInStatement',
                    message:
                        // eslint-disable-next-line max-len
                        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
                },
                {
                    selector: 'ForOfStatement',
                    message:
                        // eslint-disable-next-line max-len
                        'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
                },
                {
                    selector: 'LabeledStatement',
                    message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
                },
                {
                    selector: 'WithStatement',
                    message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
                },
                {
                    selector: 'TSEnumDeclaration',
                    message:
                        "Do not declare Enum, prefer 'as const' assertions. See: https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums",
                },
            ],
            // 'no-underscore-dangle': ['error', { allow: ['_id', '__WB_MANIFEST'] }],
            curly: ['warn', 'all'],
            'max-len': ['warn', { code: 160 }],
            'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
            'no-restricted-modules': ['error', { patterns: ['../*', './*'] }],
            'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
        },
    },
    {
        files: ['**.{mjs,js}', '**/**.{mjs,js}'],
        rules: {
            'jsdoc/check-tag-names': ['warn', { typed: false }],
        },
    },
    {
        files: ['test/**/*.ts'],
        rules: {
            'no-restricted-imports': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },
]
