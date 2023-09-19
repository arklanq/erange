import type {Token} from '../../utils/types.js';
import type {Provider, InstanceProvider, ClassProvider, FactoryProvider} from './Provider.js';
import {InvalidProviderSigantureException} from '../../exceptions/InvalidProviderSigantureException.js';
import type {Container} from '../Container.js';

export class ProviderResolver<T> {
  protected readonly container: Container;
  protected readonly token: Token;
  protected readonly provider: Provider<T>;

  public constructor(container: Container, token: Token, provider: Provider<T>) {
    this.container = container;
    this.token = token;
    this.provider = provider;
  }

  public resolveProvider(): T {
    if ('instance' in this.provider) return this.resolveInstanceProvider(this.provider);

    if ('class' in this.provider) return this.resolveClassProvider(this.provider);

    if ('factory' in this.provider) return this.resolveFactoryProvider(this.provider);

    throw new InvalidProviderSigantureException(this.token);
  }

  protected resolveInstanceProvider<T = unknown>(provider: InstanceProvider<T>): T {
    return provider.instance;
  }

  protected resolveClassProvider<T>(provider: ClassProvider<T>): T {
    return this.container.instantiate(provider.class);
  }

  protected resolveFactoryProvider<T>(provider: FactoryProvider<T>): T {
    return provider.factory();
  }
}
