import { Exception } from 'enhanced-exception';
import { stringifyToken } from '@/utils/logging-utils.js';
import type { Token } from '@/utils/types.js';

export class ModularContainerImportException extends Exception {
  public constructor(public readonly duplicatedToken: Token) {
    super(
      `The container cannot be imported, it has a conflicting token registered: \`${stringifyToken(duplicatedToken)}\`.`,
    );
  }
}
