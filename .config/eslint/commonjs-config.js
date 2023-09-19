import globals from 'globals';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config =   {
  files: ['**/*.cjs'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      ...globals.node,
    },
  },
  settings: {
    'import/resolver': {
      exports: {
        // Add "require" field to the conditions
        require: true,
      },
    },
  },
};

export default config;
