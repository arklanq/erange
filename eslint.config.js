// ESLint's new 'flat' config system
import eslintStockPlugin from '@eslint/js';
import globalConfig from './.config/eslint/global-config.js';
import jsConfig from './.config/eslint/js-config.js';
import tsConfig from './.config/eslint/ts-config.js';
import commonjsConfig from './.config/eslint/commonjs-config.js';
import sourceCodeConfig from './.config/eslint/source-code-config.js';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  // Global configuration
  globalConfig,

  // ESLint recommended config
  eslintStockPlugin.configs.recommended,

  // JavaScript code only
  jsConfig,

  // TypeScript code only
  tsConfig,

  // CommonJS code only
  commonjsConfig,

  // Source code only
  sourceCodeConfig,
];

export default config;
