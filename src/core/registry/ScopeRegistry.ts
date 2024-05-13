import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
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

  public register<T, A extends ScopeAnchor>(binding: Binding<T>, anchor: A): void {
    // Find existing registryMap bound to specified anchor or create new one
    const registryMap: RegistryMap = this.registryMap.get(anchor) ?? new Map<Token, Binding>();

    // Create new entry in registryMap
    registryMap.set(binding.token, binding);

    // Override entry at `scopedRegistryMap`
    this.registryMap.set(anchor, registryMap);
  }

  public unregister<T, A extends ScopeAnchor>(binding: Binding<T>, anchor: A): void {
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

  private internalResolve<T, A extends ScopeAnchor>(token: Token, anchor: A): T | BindingResolutionException {
    // Find existing registryMap bound to specified anchor
    const registryMap: RegistryMap | undefined = this.registryMap.get(anchor);

    /*
     * If registryMap is not found it means that nothing has been bound yet for the specified anchor.
     */
    if (registryMap === undefined) return new BindingResolutionException(token, anchor);

    // Look at acquired registryMap for the binding
    const binding: Binding | undefined = registryMap.get(token);

    /*
     * If binding is not found in the registryMap it means that any binding is already registered on that map
     * but not the one the caller is requesting.
     */
    if (binding === undefined) return new BindingResolutionException(token, anchor);

    return this.anyScopeResolver.resolve(binding as Binding<T>, anchor);
  }

  public resolve<T, A extends ScopeAnchor>(token: Token, anchor: A): T {
    const valueOrError: T | BindingResolutionException = this.internalResolve<T, A>(token, anchor);

    if (valueOrError instanceof BindingResolutionException) throw valueOrError;

    return valueOrError;
  }

  public tryResolve<T, A extends ScopeAnchor>(token: Token, anchor: A): T | null {
    const valueOrError: T | BindingResolutionException = this.internalResolve<T, A>(token, anchor);

    if (valueOrError instanceof BindingResolutionException) return null;

    return valueOrError;
  }

  public getBinding<T, A extends ScopeAnchor>(token: Token, anchor: A): Binding<T> {
    const registryMap: RegistryMap | undefined = this.registryMap.get(anchor);

    if (registryMap === undefined) throw new BindingResolutionException(token, anchor);

    const binding: Binding | undefined = registryMap.get(token);

    if (binding === undefined) throw new BindingResolutionException(token, anchor);

    return binding as Binding<T>;
  }
}
