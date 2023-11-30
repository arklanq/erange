import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

export class BindingResolutionException extends Exception {
  public constructor(token: Token) {
    super(
      `Inability to resolve binding for \`${String(token)}\` token.` + ` See possible causes at https://example.com.`,
    );
  }
}
