/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  files: ['src/**/*'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: true,
        devDependencies: false,
        peerDependencies: false,
      }
    ],
  },
};

export default config;
