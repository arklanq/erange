import type { Class } from './types.js';

export function isPropertyKey(any: unknown): any is PropertyKey {
  return ['string', 'number', 'symbol'].includes(typeof any);
}

export function isConstructor(fn: unknown): fn is Class<unknown> {
  //prettier-ignore
  return (
    typeof fn === 'function'
    && 'prototype' in fn
    && 'constructor' in fn.prototype
    && /^\s*class\s+/.test(fn.toString())
  );
}

export function isFunction(fn: unknown): fn is (...args: unknown[]) => Promise<unknown> {
  return typeof fn === 'function' && ['Function', 'AsyncFunction'].includes(fn.constructor.name);
}

export function isSyncFunction(fn: unknown): fn is (...args: unknown[]) => Promise<unknown> {
  return typeof fn === 'function' && fn.constructor.name === 'Function';
}

export function isAsyncFunction(fn: unknown): fn is (...args: unknown[]) => Promise<unknown> {
  return typeof fn === 'function' && fn.constructor.name === 'AsyncFunction';
}
