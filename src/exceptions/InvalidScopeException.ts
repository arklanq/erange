import {inspect} from 'node:util';
import {Exception} from 'enhanced-exception';
import type {Token} from '@/utils/types.js';

function stringifyScope(scope: unknown): string {
  return inspect(scope, {colors: false, compact: true, depth: 1});
}

export class InvalidScopeException extends Exception {
  public constructor(
    public readonly token: Token,
    public readonly scope: unknown,
  ) {
    super(
      `Inability to create a binding for \`${String(token)}\` token.` +
        ` Received invalid scope argument ${stringifyScope(scope)}` +
        ` See possible causes at https://example.com.`,
    );
  }
}
