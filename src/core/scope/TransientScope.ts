import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from '../binding/Binding.js';
import {Scope, type ScopeResolver, type EncapsulatedScope, type ScopeFactory} from './Scope.js';

export type EncapsulatedTransientScope = EncapsulatedScope<Scope.TRANSIENT>;

export class TransientScopeFactory implements ScopeFactory {
  public create(): EncapsulatedTransientScope {
    return {
      name: Scope.TRANSIENT
    };
  }
}

export type TransientScopeBinding<T> = Binding<T, EncapsulatedTransientScope>;

export class TransientScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is TransientScopeBinding<unknown> {
    return binding.scope.name === Scope.TRANSIENT;
  }

  public resolve<T>(binding: TransientScopeBinding<T>): T {
    return this.providerResolver.resolveProvider(binding.token, binding.provider);
  }
}
