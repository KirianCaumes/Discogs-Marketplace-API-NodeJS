module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        'jsdoc',
    ],
    rules: {
        '@typescript-eslint/indent': ['warn', 4],
        '@typescript-eslint/semi': ['warn', 'never'],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' }, singleline: { delimiter: 'comma' } }],
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true } },
            { selector: 'enum', format: ['PascalCase'], custom: { regex: '^E[A-Z]', match: true } },
            {
                selector: 'variable', types: ['boolean'], format: ['PascalCase'], prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
            { selector: 'typeAlias', format: ['PascalCase'], suffix: ['Type', 'Returns', 'Params'] },
        ],
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/consistent-type-imports': ['error'],
        'jsdoc/require-jsdoc': ['warn', {
            checkConstructors: false,
            contexts: [
                'ClassDeclaration', 'FunctionDeclaration', 'MethodDefinition',
                { context: 'TSPropertySignature', inlineCommentBlock: true }],
        }],
        'jsdoc/require-description': ['warn', {
            checkConstructors: false,
            contexts: [
                'TSPropertySignature', 'ClassDeclaration', 'ArrowFunctionExpression', 'FunctionDeclaration', 'FunctionExpression', 'MethodDefinition',
            ],
        }],
        'jsdoc/require-param-description': ['warn', { contexts: ['any'] }],
        'jsdoc/require-param': ['warn', { checkDestructuredRoots: false }],
        // 'capitalized-comments': ['warn', 'always'],
        'no-underscore-dangle': ['error', { allow: ['_id', '_attributes', '__value__', '_text'] }],
        curly: ['warn', 'multi', 'consistent'],
        'template-curly-spacing': 'off', // Issue: https://stackoverflow.com/questions/48391913/eslint-error-cannot-read-property-range-of-null
        'max-len': ['warn', { code: 160 }],
        'comma-dangle': ['warn', 'always-multiline'],
        'nonblock-statement-body-position': ['warn', 'below'],
        'arrow-parens': ['warn', 'as-needed'],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
        'no-restricted-modules': ['error', { patterns: ['../*', './*'] }],
        'function-paren-newline': ['error', 'consistent'],
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
