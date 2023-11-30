import {Container} from '../Container.js';
import type {ProviderResolver, Provider} from './Provider.js';

export interface FactoryProvider<T = unknown> {
  factory: {
    (): T; // pure factory function
    (container: Container): T; // takes `container` as a first argument
  };
}

export class FactoryProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve(provider: Provider): provider is FactoryProvider {
    return 'factory' in provider;
  }

  public resolve<T>(provider: FactoryProvider<T>): T {
    return provider.factory(this.container);
  }

}
