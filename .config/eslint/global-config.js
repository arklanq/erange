import globals from 'globals';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  ignores: [
    '/node_modules',
    '/dist'
  ],
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
};

export default config;
