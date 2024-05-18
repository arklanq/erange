import {Exception} from 'enhanced-exception';
import {stringifyScope, stringifyToken} from '@/utils/logging-utils.js';
import type {Token} from '@/utils/types.js';
import type {ScopeAnchor} from '../core/scope/ScopeAnchor.js';

export class ScopeResolutionException extends Exception {
  public constructor(
    public readonly token: Token,
    public readonly anchor: ScopeAnchor | null,
  ) {
    super(
      `Inability to resolve scope for \`${stringifyToken(token)}\` token` +
        (anchor ? ` in scope ${stringifyScope(anchor)}.` : '.') +
        ` See possible causes at https://example.com.`,
    );
  }
}
