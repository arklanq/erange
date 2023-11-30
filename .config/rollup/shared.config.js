import plugin_commonjs from '@rollup/plugin-commonjs';
import plugin_nodeResolve from '@rollup/plugin-node-resolve';
import plugin_typescript from '@rollup/plugin-typescript';
import createTscConfig from './tsc.config.js';
import plugin_generatePackageJson from 'rollup-plugin-generate-package-json';
import {importProjectManifest} from './utils.js';

const defaultOptions = {};

/**
 * @type {function}
 * @return {import('rollup').RollupOptions}
 */
export async function createSharedConfig(options = {}) {
  // Merge default options with passed options
  const _options = Object.assign({}, defaultOptions, options);

  // Validate required options presence
  ['dist', 'format'].forEach((requiredOption) => {
    if (_options[requiredOption] === undefined) throw new Error(`createSharedConfig(...) / \`${requiredOption}\` option cannot remain unspecified.`);
  });

  // Import project manifest (package.json)
  const projectManifest = await importProjectManifest();

  // Create `RollupOptions` object
  return {
    input: projectManifest.main,
    plugins: [
      // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
      plugin_commonjs(),

      // Allows Rollup to find modules using Node.js modules resolution
      plugin_nodeResolve({
        preferBuiltins: true,
      }),

      // Allows Rollup to convert TypeScript to JavaScript
      // Emits .js
      plugin_typescript(await createTscConfig({
        outDir: _options.dist,
        sourceMap: false,
      })),

      // Allows Rollup to convert TypeScript to JavaScript
      // Emit .d.ts
      plugin_typescript(await createTscConfig({
        outDir: _options.dist,
        declaration: true,
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
          type: _options.format === 'es' ? 'module' : 'commonjs',
          main: base.main.replace(/\.ts$/, '.js'),
          types: base.main.replace(/\.ts$/, '.d.ts'),
        }),
        outputFolder: _options.dist,
      }),
    ],
    external: Object.keys(projectManifest.dependencies)
      .concat(Object.keys(projectManifest.devDependencies))
      .map((packageName) => new RegExp(`^${packageName}(/.*)?`)),
    output: {
      dir: _options.dist,
      format: _options.format,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: '.',
      sourcemap: false,
    },
    onLog(level, log, handler) {
      if (log.code === 'CIRCULAR_DEPENDENCY')
        return; // Ignore circular dependency warnings

      handler(level, log); // otherwise, just print the log
    }
  };
}
