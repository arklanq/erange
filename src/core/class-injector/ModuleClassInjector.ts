import {ClassInstanceInitializationException} from '@/exceptions/ClassInstanceInitializationException.js';
import type {Class} from '@/utils/types.js';
import type {ClassInjector} from './ClassInjector.js';

export class ModuleClassInjector<C extends Class<unknown>> implements ClassInjector<C> {
  protected readonly clazz: C;

  public constructor(clazz: C) {
    this.clazz = clazz;
  }

  public createClassInstance(): InstanceType<C> {
    try {
      return new this.clazz() as InstanceType<C>;
    } catch (e: unknown) {
      throw new ClassInstanceInitializationException(this.clazz, e);
    }
  }
}
