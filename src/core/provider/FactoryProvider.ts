import {Container} from '../container/Container.js';
import type {Provider, ProviderFactory, ProviderResolver} from './Provider.js';

export interface FactoryProviderFunction<V> {
  (): V; // pure factory function
  (container: Container): V; // takes `Container` as a first argument
}

export interface FactoryProvider<V = unknown> {
  factory: FactoryProviderFunction<V>;
}

export function isFactoryProvider<V>(provider: Provider<V>): provider is FactoryProvider<V> {
  return 'factory' in provider;
}

export class FactoryProviderFactory implements ProviderFactory {
  public create<V>(factory: FactoryProvider<V>['factory']): FactoryProvider<V> {
    return {factory};
  }
}

export class FactoryProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isFactoryProvider.bind(this);

  public resolve<V>(provider: FactoryProvider<V>): V {
    return provider.factory(this.container);
  }
}
