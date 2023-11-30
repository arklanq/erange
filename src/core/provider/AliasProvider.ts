import type {Token} from '@/utils/types.js';
import {Container} from '../Container.js';
import type {ProviderResolver, Provider} from './Provider.js';

export interface AliasProvider {
  alias: Token;
}

export class AliasProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve(provider: Provider): provider is AliasProvider {
    return 'factory' in provider;
  }

  public resolve<T>(provider: AliasProvider): T {
    return this.container.resolve<T>(provider.alias);
  }

}
