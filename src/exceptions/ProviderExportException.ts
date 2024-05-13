import {Exception} from 'enhanced-exception';
import {stringifyToken} from '@/utils/logging-utils.js';
import type {Token} from '@/utils/types.js';

export class ProviderExportException extends Exception {
  public constructor(
    public readonly token: Token,
    previous: unknown,
  ) {
    super(
      `The container cannot export provider bound under token: \`${stringifyToken(token)}\`.` +
        ` See possible causes at https://example.com.`,
      previous,
    );
  }
}
