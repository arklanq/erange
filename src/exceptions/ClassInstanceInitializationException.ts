import { Exception } from 'enhanced-exception';
import type { Class } from '@/utils/types.js';

export class ClassInstanceInitializationException extends Exception {
  public readonly clazz: Class<unknown>;

  public constructor(clazz: Class<unknown>, previous?: unknown) {
    super(`Failed to initialize \`${clazz.name}\` class instance.`, previous);
    this.clazz = clazz;
  }
}
