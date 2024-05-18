import {Exception} from 'enhanced-exception';
import type {AbstractModule} from '../core/module/AbstractModule.js';
import type {Class} from '../utils/types.js';

export class ModuleConfigurationException extends Exception {
  public constructor(
    public readonly moduleClazz: Class<AbstractModule>,
    previous?: unknown,
  ) {
    super(
      `Failed to initialize / configure module \`${moduleClazz.name}\`.` +
        ` See possible causes at https://example.com.`,
      previous,
    );
  }
}
