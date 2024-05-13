import {Container} from '../container/Container.js';
import type {Provider, ProviderFactory, ProviderResolver} from './Provider.js';

export interface FactoryProviderFunction<T> {
  (): T; // pure factory function
  (container: Container): T; // takes `Container` as a first argument
}

export interface FactoryProvider<T = unknown> {
  factory: FactoryProviderFunction<T>;
}

export function isFactoryProvider<T>(provider: Provider<T>): provider is FactoryProvider<T> {
  return 'factory' in provider;
}

export class FactoryProviderFactory implements ProviderFactory {
  public create<T>(factory: FactoryProvider<T>['factory']): FactoryProvider<T> {
    return {factory};
  }
}

export class FactoryProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isFactoryProvider.bind(this);

  public resolve<T>(provider: FactoryProvider<T>): T {
    return provider.factory(this.container);
  }
}
