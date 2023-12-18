import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

import {type ScopeAnchor, getScopeAnchorHumanReadableRepresentation} from '../core/scope/ScopeAnchor.js';

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
