import { ScopeResolutionException } from '@/exceptions/ScopeResolutionException.js';
import type { Binding } from '../binding/Binding.js';
import { AnyProviderResolver } from '../provider/AnyProviderResolver.js';
import { CustomScopeResolver } from './CustomScope.js';
import type { ScopeResolver } from './Scope.js';
import type { ScopeAnchor } from './ScopeAnchor.js';
import { SingletonScopeResolver } from './SingletonScope.js';
import { TransientScopeResolver } from './TransientScope.js';

export class AnyScopeResolver {
  protected readonly scopeResolvers: ScopeResolver[];

  public constructor(providerResolver: AnyProviderResolver) {
    this.scopeResolvers = [
      new SingletonScopeResolver(providerResolver),
      new TransientScopeResolver(providerResolver),
      new CustomScopeResolver(providerResolver),
    ];
  }

  public resolve<V, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<V>, anchor: A | null): V {
    for (const resolver of this.scopeResolvers) {
      if (resolver.canResolve(binding, anchor)) return resolver.resolve<V, A>(binding, anchor);
    }

    // Will this ever happen?
    throw new ScopeResolutionException(binding.token, anchor);
  }
}
