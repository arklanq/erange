import {ProviderResolutionException} from '@/exceptions/ProviderResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {ResolutionContext} from '../scope/ResolutionContext.js';
import type {ProviderResolver, Provider} from './Provider.js';
import {ClassProviderResolver} from './ClassProvider.js';
import {InstanceProviderResolver} from './InstanceProvider.js';
import {FactoryProviderResolver} from './FactoryProvider.js';
import {AliasProviderResolver} from './AliasProvider.js';

export class AnyProviderResolver {
  protected readonly providerResolvers: readonly ProviderResolver[];

  public constructor({container}: ResolutionContext) {
    this.providerResolvers = [
      new ClassProviderResolver(container),
      new InstanceProviderResolver(container),
      new FactoryProviderResolver(container),
      new AliasProviderResolver(container),
    ];
  }

  public resolve<T>(token: Token, provider: Provider<T>, scope: object | null): T {
    for (const resolver of this.providerResolvers) {
      if (resolver.canResolve(provider)) return resolver.resolve<T>(provider);
    }

    throw new ProviderResolutionException(token, scope);
  }
}
