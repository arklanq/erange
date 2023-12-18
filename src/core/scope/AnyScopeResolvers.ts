import {ScopeResolutionException} from '@/exceptions/ScopeResolutionException.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {ScopeResolver} from './Scope.js';
import {TransientScopeResolver} from './TransientScope.js';
import {SingletonScopeResolver} from './SingletonScope.js';
import type {ResolutionContext} from './ResolutionContext.js';
import type {Binding} from '../binding/Binding.js';
import {CustomScopeResolver} from './CustomScope.js';
import type {ScopeAnchor} from './ScopeAnchor.js';

export class AnyScopeResolvers {
  protected readonly scopeResolvers: ScopeResolver[];

  public constructor(context: ResolutionContext) {
    const providerResolver: AnyProviderResolver = new AnyProviderResolver(context);

    this.scopeResolvers = [
      new SingletonScopeResolver(providerResolver),
      new TransientScopeResolver(providerResolver),
      new CustomScopeResolver(providerResolver),
    ];
  }

  public resolve<T, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<T>, anchor: A | null): T {
    for (const resolver of this.scopeResolvers) {
      if (resolver.canResolve(binding, anchor)) return resolver.resolve<T, A>(binding, anchor);
    }

    // Will this never happen?
    throw new ScopeResolutionException(binding.token, anchor);
  }
}
