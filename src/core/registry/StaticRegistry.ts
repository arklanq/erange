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

  public register<T>(binding: Binding<T>): void {
    this.registryMap.set(binding.token, binding);
  }

  public unregister<T>(binding: Binding<T>): void {
    this.registryMap.delete(binding.token);
  }

  private internalResolve<T>(token: Token): T | BindingResolutionException {
    // Look at `defaultRegistryMap` for the binding
    const binding: Binding | undefined = this.registryMap.get(token);

    // if not found -> throw exception
    if (!binding) return new BindingResolutionException(token, null);

    return this.anyScopeResolver.resolve(binding as Binding<T>, null);
  }

  public resolve<T>(token: Token): T {
    const valueOrError: T | BindingResolutionException = this.internalResolve<T>(token);

    if (valueOrError instanceof BindingResolutionException) throw valueOrError;

    return valueOrError;
  }

  public tryResolve<T>(token: Token): T | null {
    const valueOrError: T | BindingResolutionException = this.internalResolve<T>(token);

    if (valueOrError instanceof BindingResolutionException) return null;

    return valueOrError;
  }

  public getBinding<T>(token: Token): Binding<T> {
    const binding: Binding | undefined = this.registryMap.get(token);

    if (!binding) throw new BindingResolutionException(token, null);

    return binding as Binding<T>;
  }

  public getAllRegisteredTokens(): Token[] {
    return Array.from(this.registryMap.keys());
  }
}
