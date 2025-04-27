import { inspect } from 'node:util';
import { isConstructor, isFunction } from './type-guards.js';

function stringify(unknown: unknown): string {
  if (isConstructor(unknown) || isFunction(unknown)) return unknown.name;

  if (typeof unknown === 'object' && unknown !== null) return unknown.constructor.name;

  return inspect(unknown, { colors: false, depth: 0, compact: true, breakLength: Infinity });
}

export const stringifyToken = stringify;

export const stringifyScope = stringify;
