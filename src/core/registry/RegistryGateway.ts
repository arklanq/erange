import type { Token } from '@/utils/types.js';
import type { Binding } from '../binding/Binding.js';
import { AnyScopeResolver } from '../scope/AnyScopeResolver.js';
import type { ScopeAnchor } from '../scope/ScopeAnchor.js';
import { ScopeRegistry } from './ScopeRegistry.js';
import { StaticRegistry } from './StaticRegistry.js';

export class RegistryGateway {
  protected readonly registry: {
    static: StaticRegistry;
    scope: ScopeRegistry;
  };

  public constructor(anyScopeResolver: AnyScopeResolver) {
    this.registry = {
      static: new StaticRegistry(anyScopeResolver),
      scope: new ScopeRegistry(anyScopeResolver),
    };
  }

  public register<V = unknown, A extends ScopeAnchor | null = null>(binding: Binding<V>, anchor: A | null): void {
    if (anchor) this.registry.scope.register(binding, anchor);
    else this.registry.static.register(binding);
  }

  public unregister<V = unknown, A extends ScopeAnchor | null = null>(binding: Binding<V>, anchor: A | null): void {
    if (anchor) this.registry.scope.unregister(binding, anchor);
    else this.registry.static.unregister(binding);
  }

  public resolve<V, A extends ScopeAnchor | null>(token: Token, anchor: A | null): V {
    if (anchor) return this.registry.scope.resolve<V, NonNullable<A>>(token, anchor);
    else return this.registry.static.resolve<V>(token);
  }

  public tryResolve<V, A extends ScopeAnchor | null>(token: Token, anchor: A | null): V | null {
    if (anchor) return this.registry.scope.tryResolve<V, NonNullable<A>>(token, anchor);
    else return this.registry.static.tryResolve<V>(token);
  }

  public getBinding<V = unknown, A extends ScopeAnchor | null = null>(token: Token, anchor: A | null): Binding<V> {
    if (anchor) return this.registry.scope.getBinding<V, NonNullable<A>>(token, anchor);
    else return this.registry.static.getBinding<V>(token);
  }

  public getAllRegisteredTokens(): Token[] {
    return this.registry.static.getAllRegisteredTokens();
  }
}
