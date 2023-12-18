import {inspect} from 'node:util';

export type ScopeAnchor = object | ((...args: unknown[]) => unknown) | symbol;

export function isValidCustomScopeAnchor(anchor: unknown): anchor is ScopeAnchor {
  return ['object', 'function', 'symbol'].includes(typeof anchor) && anchor !== null;
}

export function getScopeAnchorHumanReadableRepresentation(anchor: ScopeAnchor): string {
  if (typeof anchor === 'object' && anchor !== null && 'name' in anchor) return String(anchor.name);
  if (typeof anchor === 'function' && 'name' in anchor) return String(anchor.name);
  if (typeof anchor === 'symbol') return String(anchor);
  return inspect(anchor, {colors: false, compact: true, depth: 1});
}
