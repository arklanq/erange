import { Exception } from 'enhanced-exception';
import { stringifyToken } from '@/utils/logging-utils.js';
import type { Token } from '@/utils/types.js';

export class FactoryValueGenerationException extends Exception {
  public constructor(token: Token, previous: unknown) {
    super(
      `An error occurred while generating a value by the factory for token \`${stringifyToken(token)}\`.`,
      previous,
    );
  }
}
