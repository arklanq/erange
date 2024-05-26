import type {AliasProvider} from './AliasProvider.js';
import type {ClassProvider} from './ClassProvider.js';
import type {FactoryProvider} from './FactoryProvider.js';
import type {InstanceProvider} from './InstanceProvider.js';

export type Provider<V = unknown> = ClassProvider<V> | InstanceProvider<V> | FactoryProvider<V> | AliasProvider;

export interface ProviderFactory {
  create(...args: unknown[]): Provider;
}

export interface ProviderResolver {
  canResolve(provider: Provider): boolean;
  resolve<V>(provider: Provider<V>): V;
}
