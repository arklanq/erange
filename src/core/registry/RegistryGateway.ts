import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {AnyScopeResolver} from '../scope/AnyScopeResolver.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';
import {ScopeRegistry} from './ScopeRegistry.js';
import {StaticRegistry} from './StaticRegistry.js';

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

  public register<T = unknown, A extends ScopeAnchor | null = null>(binding: Binding<T>, anchor: A | null): void {
    if (anchor) this.registry.scope.register<T, NonNullable<A>>(binding, anchor);
    else this.registry.static.register<T>(binding);
  }

  public unregister<T = unknown, A extends ScopeAnchor | null = null>(binding: Binding<T>, anchor: A | null): void {
    if (anchor) this.registry.scope.unregister<T, NonNullable<A>>(binding, anchor);
    else this.registry.static.unregister<T>(binding);
  }

  public resolve<T = unknown, A extends ScopeAnchor | null = null>(token: Token, anchor: A | null): T {
    if (anchor) return this.registry.scope.resolve<T, NonNullable<A>>(token, anchor);
    else return this.registry.static.resolve<T>(token);
  }

  public tryResolve<T = unknown, A extends ScopeAnchor | null = null>(token: Token, anchor: A | null): T | null {
    if (anchor) return this.registry.scope.tryResolve<T, NonNullable<A>>(token, anchor);
    else return this.registry.static.tryResolve<T>(token);
  }

  public getBinding<T = unknown, A extends ScopeAnchor | null = null>(token: Token, anchor: A | null): Binding<T> {
    if (anchor) return this.registry.scope.getBinding<T, NonNullable<A>>(token, anchor);
    else return this.registry.static.getBinding<T>(token);
  }

  public getAllRegisteredTokens(): Token[] {
    return this.registry.static.getAllRegisteredTokens();
  }
}
