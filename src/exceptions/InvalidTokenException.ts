import {Exception} from 'enhanced-exception';
import type {Token} from '../utils/types.js';

export class InvalidTokenException extends Exception {
  public constructor(public readonly token: Token) {
    super(`Provided token is undefined (typeof token = ${typeof token}).`);
  }
}
