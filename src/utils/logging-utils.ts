import {inspect} from 'node:util';

function stringify(unknown: unknown): string {
  return inspect(unknown, {colors: false, depth: 0, compact: true, breakLength: Infinity});
}

export const stringifyToken = stringify;

export const stringifyScope = stringify;
