import eslintStockPlugin from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier";
import globalConfig from './.config/eslint/global-config.js';
import tsConfig from './.config/eslint/ts-config.js';
import sourceCodeConfig from './.config/eslint/source-code-config.js';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  // Global configuration
  globalConfig,

  // ESLint recommended config
  eslintStockPlugin.configs.recommended,

  // TypeScript code only
  ...tsConfig,

  // Source code only
  sourceCodeConfig,

  // Turns off all rules that are unnecessary or might conflict with Prettier
  eslintConfigPrettier
];

export default config;
