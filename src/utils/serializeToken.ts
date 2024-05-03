import type {Class, Token} from './types.js';

export function serializeToken(tokenOrClass: Token | Class<unknown>): Token {
  if (typeof tokenOrClass === 'function' && 'name' in tokenOrClass && typeof tokenOrClass.name === 'string')
    return tokenOrClass.name;

  switch (typeof tokenOrClass) {
    case 'string':
    case 'number':
    case 'symbol':
      return tokenOrClass;
    default:
      return String(tokenOrClass);
  }
}
