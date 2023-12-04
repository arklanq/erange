import type {ClassProvider} from './ClassProvider.js';
import type {InstanceProvider} from './InstanceProvider.js';
import type {FactoryProvider} from './FactoryProvider.js';
import type {AliasProvider} from './AliasProvider.js';

export type Provider<T = unknown> = ClassProvider<T> | InstanceProvider<T> | FactoryProvider<T> | AliasProvider;

export interface ProviderFactory {
  create(...args: unknown[]): Provider;
}

export interface ProviderResolver {
  canResolve(provider: Provider): boolean;

  resolve<T>(provider: Provider<T>): T;
}
