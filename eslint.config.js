import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ['node_modules', 'dist'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
  // Turns on ESLint's recommended config
  eslint.configs.recommended,
  // Turns on TypeScript-ESLint's recommended config
  ...tseslint.configs.recommended,
  // Tweak TS config options
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
  // Support linting of ES2015+ import/export syntax
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  // Automatically sort import/export statements
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  // Turns off all styling rules that might conflict with Prettier
  eslintConfigPrettier,
  // Custom rules
  {
    rules: {
      // TypeScript's `noFallthroughCasesInSwitch` option is more robust
      'no-fallthrough': 'off',
      'default-case': 'off',
      // Enforce the use of top-level import type qualifier when TS --verbatimModuleSyntax option is enabled
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Allow unused vars with leading underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // Require explicit accessibility modifiers on class properties and methods
      '@typescript-eslint/explicit-member-accessibility': 'error',
      // Annoying if used on purpose
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Allow explicit type declarations everywhere
      '@typescript-eslint/no-inferrable-types': 'off',
      // Disable explicit function return types
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default config;
