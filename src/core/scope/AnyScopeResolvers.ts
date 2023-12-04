import {ScopeResolutionException} from '@/exceptions/ScopeResolutionException.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {ScopeResolver} from './Scope.js';
import {TransientScopeResolver} from './TransientScope.js';
import {SingletonScopeResolver} from './SingletonScope.js';
import type {ResolutionContext} from './ResolutionContext.js';
import type {Binding} from '../binding/Binding.js';
import {CustomScopeResolver} from './CustomScope.js';

export class AnyScopeResolvers {
  protected readonly scopeResolvers: ScopeResolver[];

  public constructor(context: ResolutionContext) {
    const providerResolver: AnyProviderResolver = new AnyProviderResolver(context);

    this.scopeResolvers = [
      new TransientScopeResolver(providerResolver),
      new SingletonScopeResolver(providerResolver),
      new CustomScopeResolver(providerResolver),
    ];
  }

  public resolve<T, S extends object = object>(binding: Binding<T>, scope: S | null): T {
    for (const resolver of this.scopeResolvers) {
      if (resolver.canResolve(binding, scope)) return resolver.resolve<T, S>(binding, scope);
    }

    // Will this never happen?
    throw new ScopeResolutionException(binding.token, scope);
  }
}
