import type {ClassInjector} from './ClassInjector.js';
import type {Class} from '@/utils/types.js';
import type {Container} from '../Container.js';
import {ClassInstanceInitializationException} from '@/exceptions/ClassInstanceInitializationException.js';

export class ClassicClassInjector<Clazz extends Class<unknown>> implements ClassInjector<Clazz> {
  protected readonly container: Container;
  protected readonly clazz: Clazz;

  public constructor(container: Container, clazz: Clazz) {
    this.container = container;
    this.clazz = clazz;
  }

  public createClassInstance(): InstanceType<Clazz> {
    try {
      return new this.clazz(this.container) as InstanceType<Clazz>;
    } catch (e: unknown) {
      throw new ClassInstanceInitializationException(this.clazz, e);
    }
  }
}
