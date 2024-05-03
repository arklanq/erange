import {Exception} from 'enhanced-exception';
import {getScopeAnchorHumanReadableRepresentation, type ScopeAnchor} from '../core/scope/ScopeAnchor.js';
import type {Token} from '../utils/types.js';

export class ProviderResolutionException extends Exception {
  public constructor(
    public readonly token: Token,
    public readonly anchor: ScopeAnchor | null,
  ) {
    super(
      `Inability to resolve provider for \`${String(token)}\` token` +
        (anchor ? ` in scope ${getScopeAnchorHumanReadableRepresentation(anchor)}.` : '.') +
        ` See possible causes at https://example.com.`,
    );
  }
}
