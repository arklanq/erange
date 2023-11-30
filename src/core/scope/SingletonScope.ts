import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from '../binding/Binding.js';
import {Scope, type ScopeResolver, type EncapsulatedScope, type ScopeFactory} from './Scope.js';

interface SingletonScopeData<T> {
  cache: T | null;
}

export type SingletonEncapsulatedScope<T> = EncapsulatedScope<Scope.SINGLETON> & SingletonScopeData<T>;

export class SingletonScopeFactory implements ScopeFactory {
  public create<T>(cache: T | null): SingletonEncapsulatedScope<T> {
    return {
      name: Scope.SINGLETON,
      cache: cache
    };
  }
}

export type SingletonBinding<T> = Binding<T, SingletonEncapsulatedScope<T>>;

export class SingletonScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is SingletonBinding<unknown> {
    return binding.scope.name === Scope.SINGLETON;
  }

  public resolve<T>(binding: SingletonBinding<T>): T {
    const scopeData: SingletonScopeData<T> = binding.scope;

    if (scopeData.cache != null) return scopeData.cache;

    return scopeData.cache = this.providerResolver.resolveProvider(binding.token, binding.provider);
  }
}
