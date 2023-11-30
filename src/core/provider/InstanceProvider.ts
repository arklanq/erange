import {Container} from '../Container.js';
import type {ProviderResolver, Provider} from './Provider.js';

export interface InstanceProvider<T = unknown> {
  instance: T;
}

export class InstanceProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve(provider: Provider): provider is InstanceProvider {
    return 'instance' in provider;
  }

  public resolve<T>(provider: InstanceProvider<T>): T {
    return provider.instance;
  }

}
