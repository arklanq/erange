import {InvalidTokenException} from '@/exceptions/InvalidTokenException.js';
import type {Token} from '@/utils/types.js';
import {Container} from '../Container.js';
import type {Provider, ProviderFactory, ProviderResolver} from './Provider.js';

export interface AliasProvider {
  alias: Token;
}

export function isAliasProvider(provider: Provider): provider is AliasProvider {
  return 'alias' in provider;
}

export class AliasProviderFactory implements ProviderFactory {
  public create(tokenOrClass: Token): AliasProvider {
    if (tokenOrClass == null) throw new InvalidTokenException(tokenOrClass);
    return {alias: tokenOrClass};
  }
}

export class AliasProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isAliasProvider.bind(this);

  public resolve<T>(provider: AliasProvider): T {
    return this.container.resolve<T>(provider.alias);
  }
}
