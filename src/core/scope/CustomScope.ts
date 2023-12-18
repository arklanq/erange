import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from '../binding/Binding.js';
import type {ScopeResolver, EncapsulatedScope, ScopeFactory, CustomScopeName} from './Scope.js';
import {isValidCustomScopeAnchor, type ScopeAnchor} from './ScopeAnchor.js';

export type EncapsulatedCustomScope = EncapsulatedScope<CustomScopeName>;

export function isCustomScope(scope: EncapsulatedScope): scope is EncapsulatedCustomScope {
  return scope.name === 'CUSTOM';
}

export class CustomScopeFactory implements ScopeFactory {
  public create(): EncapsulatedCustomScope {
    return {name: 'CUSTOM'};
  }
}

export type CustomScopeBinding<T> = Binding<T, EncapsulatedCustomScope>;

export class CustomScopeResolver implements ScopeResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding, anchor: unknown): binding is CustomScopeBinding<unknown> {
    return isCustomScope(binding.scope) && isValidCustomScopeAnchor(anchor);
  }

  public resolve<T, A extends ScopeAnchor>(binding: CustomScopeBinding<T>, anchor: A | null): T {
    return this.providerResolver.resolve(binding.token, binding.provider, anchor);
  }
}
