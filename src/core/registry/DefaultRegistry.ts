import type {Token} from '@/utils/types.js';
import {ProviderResolutionException} from '@/exceptions/ProviderResolutionException.js';
import type {Container} from '../Container.js';
import type {Binding} from '../binding/Binding.js';
import {AnyBindingResolver} from '../binding/AnyBindingResolver.js';
import type {Registry, RegistryMap} from './Registry.js';

export class DefaultRegistry implements Registry {
  protected readonly bindingResolver: AnyBindingResolver;
  protected readonly map: RegistryMap = new Map();

  public constructor(container: Container) {
    this.bindingResolver = new AnyBindingResolver(container);
  }

  public register<T = unknown>(binding: Binding<T>): void {
    this.map.set(binding.token, binding);
  }

  public resolve<T = unknown>(token: Token): T {
    const binding: Binding | undefined = this.map.get(token);

    if (!binding) throw new ProviderResolutionException(token);

    return this.bindingResolver.resolve(binding as Binding<T>);
  }
}
