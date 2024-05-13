export type ScopeAnchor = object | ((...args: unknown[]) => unknown) | symbol;

export function isValidCustomScopeAnchor(anchor: unknown): anchor is ScopeAnchor {
  return ['object', 'function', 'symbol'].includes(typeof anchor) && anchor !== null;
}
