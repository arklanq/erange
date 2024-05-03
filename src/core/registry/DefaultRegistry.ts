import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import type {Container} from '../Container.js';
import {AnyScopeResolvers} from '../scope/AnyScopeResolvers.js';
import type {ResolutionContext} from '../scope/ResolutionContext.js';
import {createResolutionContext} from '../scope/ResolutionContext.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';
import type {Registry, RegistryMap, ScopedRegistryMap} from './Registry.js';

export class DefaultRegistry implements Registry {
  protected readonly scopeResolver: AnyScopeResolvers;
  protected readonly defaultRegistryMap: RegistryMap = new Map();
  protected readonly scopedRegistryMap: ScopedRegistryMap = new WeakMap();

  public constructor(container: Container) {
    const context: ResolutionContext = createResolutionContext(container);
    this.scopeResolver = new AnyScopeResolvers(context);
  }

  public register<T = unknown, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<T>, anchor: A | null): void {
    // If `anchor` has been provided we shall look at `scopedRegistryMap`
    if (anchor) {
      // Find existing registryMap bound to specified anchor or create new one
      const registryMap: RegistryMap = this.scopedRegistryMap.get(anchor) ?? new Map<Token, Binding>();

      // Create new entry in registryMap
      registryMap.set(binding.token, binding);

      // Override entry at `scopedRegistryMap`
      this.scopedRegistryMap.set(anchor, registryMap);
    }
    // ... otherwise save the binding at `defaultRegistryMap`
    else {
      this.defaultRegistryMap.set(binding.token, binding);
    }
  }

  public unregister<T = unknown, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<T>, anchor: A | null): void {
    // If `anchor` has been provided we shall look at `scopedRegistryMap`
    if (anchor) {
      // Find existing registryMap bound to specified anchor or create new one
      const registryMap: RegistryMap | undefined = this.scopedRegistryMap.get(anchor);

      /*
       * If registryMap is not found it means that nothing has been binded yet for the specified anchor.
       * Such situation should never happen, in any case code is safely returning here.
       */
      if (registryMap === undefined) return;

      // Delete entry from registryMap
      registryMap.delete(binding.token);

      // Override entry at `scopedRegistryMap`
      this.scopedRegistryMap.set(anchor, registryMap);
    }
    // ... otherwise delete the binding from `defaultRegistryMap`
    else {
      this.defaultRegistryMap.delete(binding.token);
    }
  }

  public resolve<T = unknown, A extends ScopeAnchor = ScopeAnchor>(token: Token, anchor: A | null): T {
    let binding: Binding;

    // If `anchor` has been provided we shall look at `scopedRegistryMap`
    if (anchor) {
      // Find existing registryMap bound to specified anchor
      const registryMap: RegistryMap | undefined = this.scopedRegistryMap.get(anchor);

      /*
       * If registryMap is not found it means that nothing has been binded yet for the specified anchor.
       */
      if (registryMap === undefined) throw new BindingResolutionException(token, anchor);

      // Look at acquired registryMap for the binding
      const bindingLookup: Binding | undefined = registryMap.get(token);

      /*
       * If binding is not found in the registryMap it means that any binding is already registered on that map
       * but not the one the caller is requesting.
       */
      if (bindingLookup === undefined) throw new BindingResolutionException(token, anchor);

      binding = bindingLookup;
    }
    // ... otherwise look for the binding at `defaultRegistryMap`
    else {
      // Look at `defaultRegistryMap` for the binding
      const bindingLookup: Binding | undefined = this.defaultRegistryMap.get(token);

      // if not found -> throw exception
      if (!bindingLookup) throw new BindingResolutionException(token, null);

      binding = bindingLookup;
    }

    return this.scopeResolver.resolve(binding as Binding<T>, anchor);
  }
}
