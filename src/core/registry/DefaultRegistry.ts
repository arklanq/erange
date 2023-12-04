import type {Token} from '@/utils/types.js';
import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Container} from '../Container.js';
import type {Binding} from '../binding/Binding.js';
import {AnyScopeResolvers} from '../scope/AnyScopeResolvers.js';
import type {Registry, RegistryMap, ScopedRegistryMap} from './Registry.js';
import type {ResolutionContext} from '../scope/ResolutionContext.js';
import {createResolutionContext} from '../scope/ResolutionContext.js';

export class DefaultRegistry implements Registry {
  protected readonly scopeResolver: AnyScopeResolvers;
  protected readonly defaultRegistryMap: RegistryMap = new Map();
  protected readonly scopedRegistryMap: ScopedRegistryMap = new WeakMap();

  public constructor(container: Container) {
    const context: ResolutionContext = createResolutionContext(container);
    this.scopeResolver = new AnyScopeResolvers(context);
  }

  public register<T = unknown, S extends object = object>(binding: Binding<T>, scope: S | null): void {
    // If `scope` has been provided we shall look at `scopedRegistryMap`
    if (scope) {
      // Find existing registryMap bound to specified scope or create new one
      const registryMap: RegistryMap = this.scopedRegistryMap.get(scope) ?? new Map<Token, Binding>();

      // Create new entry in registryMap
      registryMap.set(binding.token, binding);

      // Override entry at `scopedRegistryMap`
      this.scopedRegistryMap.set(scope, registryMap);
    }
    // ... otherwise save the binding at `defaultRegistryMap`
    else {
      this.defaultRegistryMap.set(binding.token, binding);
    }
  }

  public unregister<T = unknown, S extends object = object>(binding: Binding<T>, scope: S | null): void {
    // If `scope` has been provided we shall look at `scopedRegistryMap`
    if (scope) {
      // Find existing registryMap bound to specified scope or create new one
      const registryMap: RegistryMap | undefined = this.scopedRegistryMap.get(scope);

      /*
       * If registryMap is not found it means that nothing has been binded yet for the specified scope.
       * Such situation should never happen, in any case code is safely returning here.
       */
      if (registryMap === undefined) return;

      // Delete entry from registryMap
      registryMap.delete(binding.token);

      // Override entry at `scopedRegistryMap`
      this.scopedRegistryMap.set(scope, registryMap);
    }
    // ... otherwise delete the binding from `defaultRegistryMap`
    else {
      this.defaultRegistryMap.delete(binding.token);
    }
  }

  public resolve<T = unknown, S extends object = object>(token: Token, scope: S | null): T {
    let binding: Binding;

    // If `scope` has been provided we shall look at `scopedRegistryMap`
    if (scope) {
      // Find existing registryMap bound to specified scope
      const registryMap: RegistryMap | undefined = this.scopedRegistryMap.get(scope);

      /*
       * If registryMap is not found it means that nothing has been binded yet for the specified scope.
       */
      if (registryMap === undefined) throw new BindingResolutionException(token, scope);

      // Look at acquired registryMap for the binding
      const bindingLookup: Binding | undefined = registryMap.get(token);

      /*
       * If binding is not found in the registryMap it means that any binding is already registered on that map
       * but not the one the caller is requesting.
       */
      if (bindingLookup === undefined) throw new BindingResolutionException(token, scope);

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

    return this.scopeResolver.resolve(binding as Binding<T>, scope);
  }
}
