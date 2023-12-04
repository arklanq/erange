import {Container} from '../Container.js';
import type {ProviderResolver, Provider, ProviderFactory} from './Provider.js';

export interface InstanceProvider<T = unknown> {
  instance: T;
}

export function isInstanceProvider<T>(provider: Provider<T>): provider is InstanceProvider<T> {
  return 'instance' in provider;
}

export class InstanceProviderFactory implements ProviderFactory {
  public create<T>(instance: T): InstanceProvider<T> {
    return {instance};
  }
}

export class InstanceProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isInstanceProvider.bind(this);

  public resolve<T>(provider: InstanceProvider<T>): T {
    return provider.instance;
  }
}
