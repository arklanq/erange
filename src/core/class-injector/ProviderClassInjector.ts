import {ClassInstanceInitializationException} from '@/exceptions/ClassInstanceInitializationException.js';
import type {Class} from '@/utils/types.js';
import type {Container} from '../container/Container.js';
import type {ClassInjector} from './ClassInjector.js';

export class ProviderClassInjector<C extends Class<unknown>> implements ClassInjector<C> {
  protected readonly container: Container;
  protected readonly clazz: C;

  public constructor(container: Container, clazz: C) {
    this.container = container;
    this.clazz = clazz;
  }

  public createClassInstance(): InstanceType<C> {
    try {
      return new this.clazz(this.container) as InstanceType<C>;
    } catch (e: unknown) {
      throw new ClassInstanceInitializationException(this.clazz, e);
    }
  }
}
