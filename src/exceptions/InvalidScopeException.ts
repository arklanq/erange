import {inspect} from 'node:util';
import {Exception} from 'enhanced-exception';
import type {Token} from '@/utils/types.js';
import {stringifyToken} from '../utils/logging-utils.js';

function stringifyScope(scope: unknown): string {
  return inspect(scope, {colors: false, compact: true, depth: 1});
}

export class InvalidScopeException extends Exception {
  public constructor(
    public readonly token: Token,
    public readonly scope: unknown,
  ) {
    super(
      `Inability to create a binding for \`${stringifyToken(token)}\` token.` +
        ` Received invalid scope argument ${stringifyScope(scope)}` +
        ` See possible causes at https://example.com.`,
    );
  }
}
