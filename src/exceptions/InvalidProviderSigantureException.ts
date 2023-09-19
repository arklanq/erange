import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

export class InvalidProviderSigantureException extends Exception {
  public constructor(token: Token) {
    super(`Invalid provider signature for \`${String(token)}\` token. Please refer to docs at https://example.com.`);
  }
}
