import asyncFs from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const rootDirPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');

export async function importTsConfig() {
  const filePath = path.resolve(rootDirPath, 'tsconfig.json');
  const fileBody = await asyncFs.readFile(filePath, {encoding: 'utf-8'});
  return JSON.parse(fileBody);
}

export async function importProjectManifest() {
  const filePath = path.resolve(rootDirPath, 'package.json');
  return await importJsonFile(filePath);
}

export async function importPackageManifest(packageName) {
  const require = createRequire(import.meta.url);
  const filePath = require.resolve(`${packageName}/package.json`);
  return await importJsonFile(filePath);
}

export async function importJsonFile(filePath) {
  const fileBody = await asyncFs.readFile(filePath, {encoding: 'utf-8'});
  return JSON.parse(fileBody);
}

export async function copyResources() {
  {
    const targets = [
      // Copy README.md to be displayed on NPM package page
      {src: 'README.md', dest: 'dist/README.md'},
      // Copy LICENSE to dist
      {src: 'LICENSE', dest: 'dist/LICENSE'},
    ];

    for(const target of targets) {
      await asyncFs.cp(
        path.join(rootDirPath, target.src),
        path.join(rootDirPath, target.dest),
      );
    }
  }
}

export async function generatePackageManifest() {
  const projectManifest = await importProjectManifest();

  const packageManifest = {
    name: projectManifest.name,
    description: projectManifest.description,
    version: projectManifest.version,
    license: projectManifest.license,
    author: projectManifest.author,
    type: 'commonjs',
    main: 'dist/cjs/src/index.js',
    module: 'dist/es/src/index.js',
    types: 'dist/cjs/src/index.d.ts',
    exports: {
      require: {
        default: 'dist/cjs/src/index.js',
        types: 'dist/cjs/src/index.d.ts'
      },
      import: {
        default: 'dist/es/src/index.js',
        types: 'dist/es/src/index.d.ts'
      }
    },
    dependencies: projectManifest.dependencies,
    peerDependencies: projectManifest.peerDependencies,
    optionalDependencies: projectManifest.optionalDependencies,
  };

  await asyncFs.writeFile('dist/package.json', JSON.stringify(packageManifest, null, 2));
}
