import type {Token, Class} from '@/utils/types.js';
import { serializeToken } from '@/utils/serializeToken.js';
import {Container} from '../Container.js';
import type {ProviderResolver, Provider} from './Provider.js';
import type {ProviderFactory} from './Provider.js';

export interface AliasProvider {
  alias: Token;
}

export function isAliasProvider(provider: Provider): provider is AliasProvider {
  return 'alias' in provider;
}

export class AliasProviderFactory implements ProviderFactory {
  public create<T>(tokenOrClass: Token | Class<T>): AliasProvider {
    return {alias: serializeToken(tokenOrClass)};
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
