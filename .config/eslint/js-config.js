import importPlugin from 'eslint-plugin-import';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  files: ['**/*.{js,cjs,mjs}'],
  languageOptions: {
    // ESLint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
    // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
  plugins: {
    // 'simple-import-sort': simpleImportSortPlugin,
    import: importPlugin,
  },
  settings: {
    'import/external-module-folders': ['node_modules'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.cjs', '.mjs'],
      },
      exports: {
        require: false,
      },
    },
    'import/parsers': {
      // If a file extension is matched, the dependency parser will require and use the map key as the parser instead of the configured ESLint parser.
      espree: ['.js', '.cjs', '.mjs'],
    },
  },
  rules: {
    // `Import` plugin's recommended configs
    ...importPlugin.configs.recommended.rules,



    // Don't leave stupid console calls in code!
    'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
    // Allow unused vars with leading underscore
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_', // ignore args starting with underscore
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    // Automatically sort imports
    // TODO: Missing package for this rule
    // 'import/order': 'off',
    // 'simple-import-sort/imports': 'warn',
    // 'simple-import-sort/exports': 'warn',
  },
};

export default config;
