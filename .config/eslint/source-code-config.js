import path from 'node:path';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import importXPlugin from 'eslint-plugin-import-x';
import appRootPath from 'app-root-path';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  files: ['src/**/*'],
  plugins: {
    'simple-import-sort': simpleImportSortPlugin,
    'import-x': importXPlugin,
  },
  settings: {
    // Inject settings from `eslint-plugin-import-x` plugin's 'typescript' config
    ...importXPlugin.configs.typescript.settings,
    // Custom import resolvers
    'import-x/resolver': {
      'eslint-import-resolver-node': {
        extensions: ['.ts', '.js'],
      },
      'eslint-import-resolver-typescript': {
        alwaysTryTypes: true,
        project: path.join(appRootPath.toString(), 'tsconfig.json')
      }
    },
  },
  rules: {
    // Inject rules from `eslint-plugin-import-x` plugin's 'typescript' config
    ...importXPlugin.configs.typescript.rules,
    // Disallow standalone, named type import
    'import-x/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: true,
        devDependencies: false,
        peerDependencies: false,
      }
    ],
    // Automatically sort imports
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [[
          // Side effect imports.
          '^\\u0000',
          // Node.js builtins prefixed with `node:`.
          '^node:',
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          '^@?\\w',
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          '^',
          // Relative imports.
          // Anything that starts with a dot.
          '^\\.',
        ]]
      }
    ],
    'simple-import-sort/exports': 'warn',
    'import-x/first': 'error',
    'import-x/newline-after-import': 'warn',
    'import-x/no-duplicates': 'warn'
  },
};

export default config;
