import {ProviderResolutionException} from '@/exceptions/InvalidProviderSigantureException.js';
import type {Token} from '@/utils/types.js';
import type {Container} from '../Container.js';
import type {ProviderResolver, Provider} from './Provider.js';
import {ClassProviderResolver} from './ClassProvider.js';
import {InstanceProviderResolver} from './InstanceProvider.js';
import {FactoryProviderResolver} from './FactoryProvider.js';
import {AliasProviderResolver} from './AliasProvider.js';

export class AnyProviderResolver {
  protected readonly resolvers: ProviderResolver[];

  public constructor(container: Container) {
    this.resolvers = [
      new ClassProviderResolver(container),
      new InstanceProviderResolver(container),
      new FactoryProviderResolver(container),
      new AliasProviderResolver(container),
    ];
  }

  public resolveProvider<T>(token: Token, provider: Provider<T>): T {
    for(const resolver of this.resolvers) {
      if (resolver.canResolve(provider))
        return resolver.resolve<T>(provider);
    }

    throw new ProviderResolutionException(token);
  }
}
