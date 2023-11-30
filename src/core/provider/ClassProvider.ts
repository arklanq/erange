import type {Class} from '@/utils/types.js';
import {Container} from '../Container.js';
import type {Provider, ProviderResolver, ProviderFactory} from './Provider.js';

export interface ClassProvider<T = unknown> {
  class: Class<T>;
}

export function isClassProvider<T>(provider: Provider<T>): provider is ClassProvider<T> {
  return 'class' in provider;
}

export class ClassProviderFactory implements ProviderFactory {
  public create<T>(clazz: Class<T>): ClassProvider<T> {
    return {class: clazz};
  }
}

export class ClassProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isClassProvider.bind(this);

  public resolve<T>(provider: ClassProvider<T>): T {
    return this.container.instantiate(provider.class);
  }
}
