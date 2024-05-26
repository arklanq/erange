import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import {ModularContainerImportException} from '@/exceptions/ModularContainerImportException.js';
import {ProviderExportException} from '@/exceptions/ProviderExportException.js';
import type {ResolvedValue, Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {Container} from '../container/Container.js';
import type {ModularityCapable} from './ModularityCapable.js';

export class ModularContainer extends Container implements ModularityCapable {
  protected imported: Set<Container> = new Set();

  /**
   * @notice Scoped bindings cannot be inspected upfront. Duplicates may arise at resolution time.
   */
  public import(container: ModularContainer): void {
    const containerImpl: Container = container as Container;

    const registeredTokens = {
      parent: this.getAllRegisteredTokens(),
      imported: containerImpl.getAllRegisteredTokens(),
    } as const satisfies Record<string, Token[]>;

    const duplicatedToken: Token = registeredTokens.parent.find((token: Token) =>
      registeredTokens.imported.includes(token),
    );

    if (duplicatedToken !== undefined) throw new ModularContainerImportException(duplicatedToken);

    this.imported.add(containerImpl);
  }

  public export<S extends object | undefined = undefined>(token: Token, scope?: S): void {
    let binding: Binding;

    try {
      binding = this.getBinding<unknown, S>(token, scope);
    } catch (e: unknown) {
      if (e instanceof BindingResolutionException) throw new ProviderExportException(token, e);

      throw e;
    }

    binding.meta.export = true;
  }

  private modularResolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> | BindingResolutionException {
    const value: ResolvedValue<V, T> | null = super.tryResolve<V, T, S>(token, scope);
    if (value) return value;

    for (const container of this.imported) {
      const value: ResolvedValue<V, T> | null = container.tryResolve<V, T, S>(token, scope);
      if (value) return value;
    }

    return new BindingResolutionException(token, scope ?? null);
  }

  public override resolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> {
    const valueOrError: ResolvedValue<V, T> | BindingResolutionException = this.modularResolve<V, T, S>(token, scope);

    if (valueOrError instanceof BindingResolutionException) throw valueOrError;

    return valueOrError;
  }

  public override tryResolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> | null {
    const valueOrError: ResolvedValue<V, T> | BindingResolutionException = this.modularResolve<V, T, S>(token, scope);

    if (valueOrError instanceof BindingResolutionException) return null;

    return valueOrError;
  }
}
