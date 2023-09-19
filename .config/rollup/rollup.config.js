import plugin_commonjs from '@rollup/plugin-commonjs';
import plugin_nodeResolve from '@rollup/plugin-node-resolve';
import plugin_typescript from '@rollup/plugin-typescript';
import plugin_delete from 'rollup-plugin-delete';
import plugin_copy from 'rollup-plugin-copy';
import plugin_generatePackageJson from 'rollup-plugin-generate-package-json';
import createTscConfig from './tsc.config.js';
import {importProjectManifest} from './utils.js';

/**
 * @type {function}
 * @return {Promise<import('rollup').RollupOptions>}
 */
export default async function createConfig() {
  const projectManifest = await importProjectManifest();

  return {
    input: projectManifest.main,
    plugins: [
      // Clean `dist` directory before next build
      plugin_delete({
        targets: ['dist'],
      }),

      process.env.NODE_ENV === 'production' && plugin_copy({
        targets: [
          // Copy README.md to be displayed on NPM package page
          {src: 'README.md', dest: 'dist'},
          // Copy LICENSE to dist
          {src: 'LICENSE', dest: 'dist'},
        ]
      }),

      // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
      plugin_commonjs(),

      // Allows Rollup to find modules using Node.js modules resolution
      plugin_nodeResolve({
        preferBuiltins: true,
      }),

      // Allows Rollup to convert TypeScript to JavaScript
      // Emits .js
      plugin_typescript(await createTscConfig({
        sourceMap: false,
      })),

      // Allows Rollup to convert TypeScript to JavaScript
      // Emit .d.ts
      plugin_typescript(await createTscConfig({
        declaration: true,
        declarationMap: false,
        emitDeclarationOnly: true,
      })),

      // Create package.json
      plugin_generatePackageJson({
        baseContents: (base) => ({
          name: base.name,
          description: base.description,
          version: base.version,
          license: base.license,
          private: false,
          type: 'module',
          main: base.main.replace(/\.ts$/, '.js'),
        }),
      }),
    ],
    external: Object.keys(projectManifest.dependencies)
      .concat(Object.keys(projectManifest.devDependencies))
      .map((packageName) => new RegExp(`^${packageName}(/.*)?`)),
    output: {
      dir: 'dist',
      format: 'es',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: '.',
      sourcemap: false,
    },
  };
}
