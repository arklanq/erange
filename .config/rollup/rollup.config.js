import {createSharedConfig} from './shared.config.js';
import {clearDistDirectory, copyResources, generatePackageManifest} from './utils.js';

/**
 * @type {function}
 * @return {Promise<(import('rollup').RollupOptions)[]>}
 */
export default async function createConfig() {
  // Clear `dist` directory before next bundle will be written
  await clearDistDirectory();

  // Copy README & LICENSE files to dist directory
  await copyResources();

  // Generate package.json for resulting package
  await generatePackageManifest();

  return [
    await createSharedConfig({dist: 'dist/es', format: 'es'}),
    await createSharedConfig({dist: 'dist/cjs', format: 'cjs'})
  ];
}
