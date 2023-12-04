import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from '../binding/Binding.js';
import {Scope, type ScopeResolver, type EncapsulatedScope, type ScopeFactory} from './Scope.js';

export const emptyCacheSymbol: unique symbol = Symbol('emptyCache');

interface SingletonScopeData<T> {
  cache: T | typeof emptyCacheSymbol;
}

export type EncapsulatedSingletonScope<T> = EncapsulatedScope<Scope.SINGLETON> & SingletonScopeData<T>;

export function isSingletonScope(scope: EncapsulatedScope): scope is EncapsulatedSingletonScope<unknown> {
  return scope.name === Scope.SINGLETON;
}

export class SingletonScopeFactory implements ScopeFactory {
  public create<T>(cache: T | typeof emptyCacheSymbol = emptyCacheSymbol): EncapsulatedSingletonScope<T> {
    return {
      name: Scope.SINGLETON,
      cache: cache,
    };
  }
}

export type SingletonScopeBinding<T> = Binding<T, EncapsulatedSingletonScope<T>>;

export class SingletonScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is SingletonScopeBinding<unknown> {
    return isSingletonScope(binding.scope);
  }

  public resolve<T>(binding: SingletonScopeBinding<T>, scope: object | null): T {
    const scopeData: SingletonScopeData<T> = binding.scope;

    // find out if 'cache' refers to 'emptyCacheSymbol' in order to know if cache is empty or not
    if (scopeData.cache !== emptyCacheSymbol) return scopeData.cache;

    return (scopeData.cache = this.providerResolver.resolve(binding.token, binding.provider, scope));
  }
}
