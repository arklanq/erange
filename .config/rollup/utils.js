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
