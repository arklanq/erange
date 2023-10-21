import path from 'node:path';
import {rootDirPath} from './utils.js';

async function createConfig(compilerOptions = {}) {
  return {
    tsconfig: path.resolve(rootDirPath, './tsconfig.json'),
    cacheDir: path.resolve(rootDirPath, './node_modules/.cache/.rollup/typescript'),
    outputToFilesystem: true,
    compilerOptions: compilerOptions,
    include: ['src/**/*.ts', '@types/**/*.ts'],
    exclude: ['node_modules', 'dist']
  };
}

export default createConfig;
