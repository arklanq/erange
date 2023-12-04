import {inspect} from 'node:util';
import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

function getScopeName(scope: object): string {
  if (scope === null) return scope;
  if ('name' in scope) return String(scope.name);
  return inspect(scope, {colors: false, compact: true, depth: 1});
}

export class ProviderResolutionException extends Exception {
  public constructor(
    public readonly token: Token,
    public readonly scope: object | null,
  ) {
    super(
      `Inability to resolve provider for \`${String(token)}\` token` +
        (scope ? ` in scope ${getScopeName(scope)}.` : '.') +
        ` See possible causes at https://example.com.`,
    );
  }
}
