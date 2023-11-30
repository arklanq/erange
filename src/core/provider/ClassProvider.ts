import type {Class} from '@/utils/types.js';
import {Container} from '../Container.js';
import type {Provider, ProviderResolver} from './Provider.js';

export interface ClassProvider<T = unknown> {
  class: Class<T>;
}

export class ClassProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve(provider: Provider): provider is Provider {
    return 'class' in provider;
  }

  public resolve<T>(provider: ClassProvider<T>): T {
    return this.container.instantiate(provider.class);
  }

}
