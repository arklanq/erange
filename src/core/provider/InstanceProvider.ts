import {Container} from '../container/Container.js';
import type {Provider, ProviderFactory, ProviderResolver} from './Provider.js';

export interface InstanceProvider<V = unknown> {
  instance: V;
}

export function isInstanceProvider<V>(provider: Provider<V>): provider is InstanceProvider<V> {
  return 'instance' in provider;
}

export class InstanceProviderFactory implements ProviderFactory {
  public create<V>(instance: V): InstanceProvider<V> {
    return {instance};
  }
}

export class InstanceProviderResolver implements ProviderResolver {
  public constructor(_container: Container) {}

  public canResolve = isInstanceProvider.bind(this);

  public resolve<V>(provider: InstanceProvider<V>): V {
    return provider.instance;
  }
}
