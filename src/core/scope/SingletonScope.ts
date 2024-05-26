import type {Binding} from '../binding/Binding.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import {type EncapsulatedScope, Scope, type ScopeFactory, type ScopeResolver} from './Scope.js';
import type {ScopeAnchor} from './ScopeAnchor.js';

export const emptyCacheSymbol: unique symbol = Symbol('emptyCache');

interface SingletonScopeData<V> {
  cache: V | typeof emptyCacheSymbol;
}

export type EncapsulatedSingletonScope<V> = EncapsulatedScope<Scope.SINGLETON> & SingletonScopeData<V>;

export function isSingletonScope(scope: EncapsulatedScope): scope is EncapsulatedSingletonScope<unknown> {
  return scope.name === Scope.SINGLETON;
}

export class SingletonScopeFactory implements ScopeFactory {
  public create<V>(cache: V | typeof emptyCacheSymbol = emptyCacheSymbol): EncapsulatedSingletonScope<V> {
    return {
      name: Scope.SINGLETON,
      cache: cache,
    };
  }
}

export type SingletonScopeBinding<V> = Binding<V, EncapsulatedSingletonScope<V>>;

export class SingletonScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is SingletonScopeBinding<unknown> {
    return isSingletonScope(binding.scope);
  }

  public resolve<V, A extends ScopeAnchor>(binding: SingletonScopeBinding<V>, anchor: A | null): V {
    const scopeData: SingletonScopeData<V> = binding.scope;

    // find out if 'cache' refers to 'emptyCacheSymbol' in order to know if cache is empty or not
    if (scopeData.cache !== emptyCacheSymbol) return scopeData.cache;

    return (scopeData.cache = this.providerResolver.resolve(binding.token, binding.provider, anchor));
  }
}
