import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {emptyStateSymbol} from '../misc/constants.js';
import type {AnyScopeResolver} from '../scope/AnyScopeResolver.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';

type RegistryMap = Map<Token, Binding>;
type ScopeRegistryMap = WeakMap<ScopeAnchor, RegistryMap>;

export class ScopeRegistry {
  protected readonly anyScopeResolver: AnyScopeResolver;
  protected readonly registryMap: ScopeRegistryMap = new WeakMap();

  public constructor(anyScopeResolver: AnyScopeResolver) {
    this.anyScopeResolver = anyScopeResolver;
  }

  public register(binding: Binding, anchor: ScopeAnchor): void {
    // Find existing registryMap bound to specified anchor or create new one
    const registryMap: RegistryMap = this.registryMap.get(anchor) ?? new Map<Token, Binding>();

    // Create new entry in registryMap
    registryMap.set(binding.token, binding);

    // Override entry at `scopedRegistryMap`
    this.registryMap.set(anchor, registryMap);
  }

  public unregister(binding: Binding, anchor: ScopeAnchor): void {
    // Find existing registryMap bound to specified anchor or create new one
    const registryMap: RegistryMap | undefined = this.registryMap.get(anchor);

    /*
     * If registryMap is not found it means that nothing has been bound yet for the specified anchor.
     * Such situation should never happen, in any case code is safely returning here.
     */
    if (registryMap === undefined) return;

    // Delete entry from registryMap
    registryMap.delete(binding.token);

    // Override entry at `scopedRegistryMap`
    this.registryMap.set(anchor, registryMap);
  }

  private internalResolve<V, A extends ScopeAnchor>(token: Token, anchor: A): V | typeof emptyStateSymbol {
    // Find existing registryMap bound to specified anchor
    const registryMap: RegistryMap | undefined = this.registryMap.get(anchor);

    /*
     * If registryMap is not found it means that nothing has been bound yet for the specified anchor.
     */
    if (registryMap === undefined) return emptyStateSymbol;

    // Look at acquired registryMap for the binding
    const binding: Binding | undefined = registryMap.get(token);

    /*
     * If binding is not found in the registryMap it means that any binding is already registered on that map
     * but not the one the caller is requesting.
     */
    if (binding === undefined) return emptyStateSymbol;

    return this.anyScopeResolver.resolve(binding as Binding<V>, anchor);
  }

  public resolve<V, A extends ScopeAnchor>(token: Token, anchor: A): V {
    const valueOrEmpty: V | typeof emptyStateSymbol = this.internalResolve<V, A>(token, anchor);

    if (valueOrEmpty === emptyStateSymbol) throw new BindingResolutionException(token, anchor);

    return valueOrEmpty;
  }

  public tryResolve<V, A extends ScopeAnchor>(token: Token, anchor: A): V | null {
    const valueOrEmpty: V | typeof emptyStateSymbol = this.internalResolve<V, A>(token, anchor);

    if (valueOrEmpty === emptyStateSymbol) return null;

    return valueOrEmpty;
  }

  public getBinding<V, A extends ScopeAnchor>(token: Token, anchor: A): Binding<V> {
    const registryMap: RegistryMap | undefined = this.registryMap.get(anchor);

    if (registryMap === undefined) throw new BindingResolutionException(token, anchor);

    const binding: Binding | undefined = registryMap.get(token);

    if (binding === undefined) throw new BindingResolutionException(token, anchor);

    return binding as Binding<V>;
  }
}
