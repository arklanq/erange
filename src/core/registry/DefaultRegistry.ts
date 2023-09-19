import type {Binding} from '../binding/Binding.js';
import type {Token} from '../../utils/types.js';
import {ProviderResolutionException} from '../../exceptions/ProviderResolutionException.js';
import {BindingResolver} from '../binding/BindingResolver.js';
import type {Registry, RegistryMap} from './Registry.js';
import type {Container} from '../Container.js';

export class DefaultRegistry implements Registry {
  protected readonly container: Container;
  protected readonly map: RegistryMap = new Map();

  public constructor(container: Container) {
    this.container = container;
  }

  public register<T = unknown>(binding: Binding<T>): void {
    this.map.set(binding.token, binding);
  }

  public resolve<T = unknown>(token: Token): T {
    const binding: Binding<unknown> | undefined = this.map.get(token);

    if (!binding) throw new ProviderResolutionException(token);

    const bindingResolver: BindingResolver<unknown> = new BindingResolver<unknown>(this.container, token, binding);

    return bindingResolver.resolveBinding() as T;
  }
}
