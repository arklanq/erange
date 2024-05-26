import type {Class} from '@/utils/types.js';
import {Container} from '../container/Container.js';
import type {Provider, ProviderFactory, ProviderResolver} from './Provider.js';

export interface ClassProvider<V = unknown> {
  class: Class<V>;
}

export function isClassProvider<V>(provider: Provider<V>): provider is ClassProvider<V> {
  return 'class' in provider;
}

export class ClassProviderFactory implements ProviderFactory {
  public create<V>(clazz: Class<V>): ClassProvider<V> {
    return {class: clazz};
  }
}

export class ClassProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isClassProvider.bind(this);

  public resolve<V>(provider: ClassProvider<V>): V {
    return this.container.instantiate(provider.class);
  }
}
