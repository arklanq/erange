import {ProviderResolutionException} from '@/exceptions/ProviderResolutionException.js';
import type {Token} from '@/utils/types.js';
import type {Container} from '../container/Container.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';
import {AliasProviderResolver} from './AliasProvider.js';
import {ClassProviderResolver} from './ClassProvider.js';
import {FactoryProviderResolver} from './FactoryProvider/FactoryProvider.js';
import {InstanceProviderResolver} from './InstanceProvider.js';
import type {Provider, ProviderResolver} from './Provider.js';

export class AnyProviderResolver {
  protected readonly providerResolvers: readonly ProviderResolver[];

  public constructor(container: Container) {
    this.providerResolvers = [
      new ClassProviderResolver(container),
      new InstanceProviderResolver(container),
      new FactoryProviderResolver(container),
      new AliasProviderResolver(container),
    ];
  }

  public resolve<V, A extends ScopeAnchor>(token: Token, provider: Provider<V>, anchor: A | null): V {
    for (const resolver of this.providerResolvers) {
      if (resolver.canResolve(provider)) return resolver.resolve<V>(provider, token);
    }

    // Will this ever happen?
    throw new ProviderResolutionException(token, anchor);
  }
}
