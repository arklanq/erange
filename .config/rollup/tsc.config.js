import path from 'node:path';
import {rootDirPath} from './utils.js';

async function createConfig() {
  return {
    tsconfig: path.resolve(rootDirPath, './tsconfig.json'),
    cacheDir: path.resolve(rootDirPath, './node_modules/.cache/.rollup/typescript'),
    outputToFilesystem: true,
    compilerOptions: {
      outDir: 'dist',
      sourceMap: true,
      // tsBuildInfoFile: '.tsbuildinfo'
    },
  };
}

export default createConfig;
