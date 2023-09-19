import {type Token, Scope} from '../../utils/types.js';
import {ProviderResolver} from '../provider/ProviderResolver.js';
import type {Binding, SingletonBinding, TransientBinding} from './Binding.js';
import type {Container} from '../Container.js';

export class BindingResolver<T> {
  protected readonly container: Container;
  protected readonly token: Token;
  protected readonly binding: Binding<T>;

  public constructor(container: Container, token: Token, binding: Binding<T>) {
    this.container = container;
    this.token = token;
    this.binding = binding;
  }

  public resolveBinding(): T {
    switch (this.binding.scope) {
      case Scope.SINGLETON:
        return this.resolveSingletonBinding(this.binding);
      case Scope.TRANSIENT:
      default:
        return this.resolveTransientBinding(this.binding);
    }
  }

  protected resolveSingletonBinding(binding: SingletonBinding<T>): T {
    if (binding.cache != null) return binding.cache;

    const providerResolver: ProviderResolver<T> = new ProviderResolver<T>(this.container, this.token, binding.provider);
    return (binding.cache = providerResolver.resolveProvider());
  }

  protected resolveTransientBinding(binding: TransientBinding<T>): T {
    const providerResolver: ProviderResolver<T> = new ProviderResolver<T>(this.container, this.token, binding.provider);
    return providerResolver.resolveProvider();
  }
}
