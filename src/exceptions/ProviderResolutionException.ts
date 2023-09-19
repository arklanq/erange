import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

export class ProviderResolutionException extends Exception {
  public constructor(token: Token) {
    super(
      `Inability to resolve provider for \`${String(token)}\` token.` + ` See possible causes at https://example.com.`,
    );
  }
}
