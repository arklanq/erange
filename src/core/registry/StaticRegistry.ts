import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {AnyScopeResolver} from '../scope/AnyScopeResolver.js';

type RegistryMap = Map<Token, Binding>;

export class StaticRegistry {
  protected readonly anyScopeResolver: AnyScopeResolver;
  protected readonly registryMap: RegistryMap = new Map();

  public constructor(anyScopeResolver: AnyScopeResolver) {
    this.anyScopeResolver = anyScopeResolver;
  }

  public register(binding: Binding): void {
    this.registryMap.set(binding.token, binding);
  }

  public unregister(binding: Binding): void {
    this.registryMap.delete(binding.token);
  }

  private internalResolve<V>(token: Token): V | BindingResolutionException {
    // Look at `defaultRegistryMap` for the binding
    const binding: Binding | undefined = this.registryMap.get(token);

    // if not found -> throw exception
    if (!binding) return new BindingResolutionException(token, null);

    return this.anyScopeResolver.resolve(binding as Binding<V>, null);
  }

  public resolve<V>(token: Token): V {
    const valueOrError: V | BindingResolutionException = this.internalResolve<V>(token);

    if (valueOrError instanceof BindingResolutionException) throw valueOrError;

    return valueOrError;
  }

  public tryResolve<V>(token: Token): V | null {
    const valueOrError: V | BindingResolutionException = this.internalResolve<V>(token);

    if (valueOrError instanceof BindingResolutionException) return null;

    return valueOrError;
  }

  public getBinding<V>(token: Token): Binding<V> {
    const binding: Binding | undefined = this.registryMap.get(token);

    if (!binding) throw new BindingResolutionException(token, null);

    return binding as Binding<V>;
  }

  public getAllRegisteredTokens(): Token[] {
    return Array.from(this.registryMap.keys());
  }
}
