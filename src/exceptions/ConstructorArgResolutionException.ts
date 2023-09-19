import {Exception} from 'enhanced-exception';
import type {Class, Token} from '../utils/types.js';

export class ConstructorArgResolutionException extends Exception {
  public readonly clazz: Class<unknown>;
  public readonly argsResolutionTokens: Token[];
  public readonly argIndex: number;

  public constructor(clazz: Class<unknown>, argsResolutionTokens: Token[], argIndex: number, previous?: unknown) {
    super(`Failed to resolve dependencies for argument ${argIndex}.`, previous);
    this.clazz = clazz;
    this.argsResolutionTokens = argsResolutionTokens;
    this.argIndex = argIndex;
  }

  public getArgumentResolutionToken(): Token {
    return this.argsResolutionTokens[this.argIndex];
  }
}
