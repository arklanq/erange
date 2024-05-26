import type {Binding} from '../binding/Binding.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import {type EncapsulatedScope, Scope, type ScopeFactory, type ScopeResolver} from './Scope.js';
import type {ScopeAnchor} from './ScopeAnchor.js';

export type EncapsulatedTransientScope = EncapsulatedScope<Scope.TRANSIENT>;

export function isTransientScope(scope: EncapsulatedScope): scope is EncapsulatedTransientScope {
  return scope.name === Scope.TRANSIENT;
}

export class TransientScopeFactory implements ScopeFactory {
  public create(): EncapsulatedTransientScope {
    return {
      name: Scope.TRANSIENT,
    };
  }
}

export type TransientScopeBinding<V> = Binding<V, EncapsulatedTransientScope>;

export class TransientScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is TransientScopeBinding<unknown> {
    return isTransientScope(binding.scope);
  }

  public resolve<V, A extends ScopeAnchor>(binding: TransientScopeBinding<V>, anchor: A | null): V {
    return this.providerResolver.resolve(binding.token, binding.provider, anchor);
  }
}
