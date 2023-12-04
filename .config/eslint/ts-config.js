import importPlugin from 'eslint-plugin-import';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  files: ['**/*.ts'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      // ESLint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
      // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
      sourceType: 'module',
      ecmaVersion: 'latest',
      project: './tsconfig.json',
      warnOnUnsupportedTypeScriptVersion: true,
      emitDecoratorMetadata: false,
    },
  },
  plugins: {
    import: importPlugin,
    '@typescript-eslint': typescriptPlugin,
  },
  settings: {
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        extensions: ['.ts', '.d.ts'],
        extensionAlias: {
          '.js': ['.ts', '.d.ts', '.js'],
        },
        mainFields: ['main', 'jsnext:main', 'module', 'types', 'typings'],
      },
    },
    'import/parsers': {
      // If a file extension is matched, the dependency parser will require and use the map key as the parser instead of the configured ESLint parser.
      espree: ['.js', '.cjs', '.mjs'],
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  rules: {
    // `Import` plugin's recommended configs
    ...importPlugin.configs.recommended.rules,
    // `TypeScript-ESLint` plugin's recommended configs
    ...typescriptPlugin.configs['eslint-recommended'].rules,
    ...typescriptPlugin.configs['recommended'].rules,
    ...typescriptPlugin.configs['recommended-type-checked'].rules,

    // Don't leave stupid console calls in code!
    'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
    // It is safe to disable this rule when using TypeScript because TypeScript's compiler enforces this check.
    'no-dupe-class-members': 'off',
    // Don't leave floating Promises in the codebase. If needed explicitly mark them with `void` operator.
    '@typescript-eslint/no-floating-promises': ['warn', {ignoreVoid: true}],
    // Allow unused vars with leading underscore
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_', // Ignore args starting with underscore
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    // Don't ban `object` type as Record<string, unknown> is not always the best solution
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {object: false},
      },
    ],
    // Require explicit accessibility modifiers on class properties and methods
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // Annoying if used on purpose
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Allow explicit type declarations everywhere
    '@typescript-eslint/no-inferrable-types': 'off',
    // TypeScript's `noFallthroughCasesInSwitch` option is more robust
    'no-fallthrough': 'off',
    'default-case': 'off',
    // Disable explicit function return types
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // It should be definetly a warning, instead of an error
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    // Disallow inline type import by error https://github.com/rollup/plugins/issues/1588
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
};

export default config;
