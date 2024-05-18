import {Exception} from 'enhanced-exception';
import {AbstractModule} from '../core/module/AbstractModule.js';
import type {Class} from '../utils/types.js';

export class ModuleImportException extends Exception {
  public constructor(
    public readonly moduleClazz: Class<AbstractModule>,
    previous?: unknown,
  ) {
    super(
      `Failed to import module \`${moduleClazz.name}\`.` + ` See possible causes at https://example.com.`,
      previous,
    );
  }
}
