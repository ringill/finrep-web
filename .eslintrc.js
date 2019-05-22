module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: [
        '@typescript-eslint',
        'react',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        //'prettier',
        'prettier/@typescript-eslint',
        'prettier/react', // disables react-specific linting rules that conflict with prettier
        'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 8,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
        ecmaFeatures: {
            jsx: true,  // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    rules: {
        // prettier
        'prettier/prettier': [
            'warn',
            {
                semi: true,
                trailingComma: 'all',
                printWidth: 120,
                tabWidth: 2,
                jsxBracketSameLine: false,
            }
        ],
        // quotes
        quotes: [
            'error',
            'double',
            { avoidEscape: true, allowTemplateLiterals: false }
        ],
        // jsx
        "react/jsx-max-props-per-line": [
            "error",
            { maximum: 1, when: "always" }
        ],
        "react/jsx-first-prop-new-line": [
            "error"
        ],

        "react/jsx-closing-bracket-location": "off",
        "react/jsx-closing-tag-location": "off",
        "react/jsx-curly-spacing": "off",
        "react/jsx-equals-spacing": "off",
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-space-before-closing": "off",
        "react/jsx-tag-spacing": "off",
        "react/jsx-wrap-multilines": "off",
        // typescript
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/interface-name-prefix': [
            'warn',
            'always'
        ],
        '@typescript-eslint/generic-type-naming': 'warn',
        '@typescript-eslint/no-array-constructor': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': [
            'warn',
            { allowExpressions: true, allowTypedFunctionExpressions: true }
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-for-in-array': 'error'
    },
};