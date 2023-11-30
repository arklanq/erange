import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from '../binding/Binding.js';
import {Scope, type ScopeResolver, type EncapsulatedScope, type ScopeFactory} from './Scope.js';

export type TransientEncapsulatedScope = EncapsulatedScope<Scope.TRANSIENT>;

export class TransientScopeFactory implements ScopeFactory {
  public create(): TransientEncapsulatedScope {
    return {
      name: Scope.TRANSIENT
    };
  }
}

export type TransientBinding<T> = Binding<T, TransientEncapsulatedScope>;

export class TransientScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): binding is TransientBinding<unknown> {
    return binding.scope.name === Scope.TRANSIENT;
  }

  public resolve<T>(binding: TransientBinding<T>): T {
    return this.providerResolver.resolveProvider(binding.token, binding.provider);
  }
}
