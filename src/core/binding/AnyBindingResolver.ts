import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Container} from '../Container.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding} from './Binding.js';
import type {ScopeResolver} from '../scope/Scope.js';
import {TransientScopeResolver} from '../scope/TransientScope.js';
import {SingletonScopeResolver} from '../scope/SingletonScope.js';

export class AnyBindingResolver {
  protected readonly resolvers: ScopeResolver[];

  public constructor(container: Container) {
    const providerResolver: AnyProviderResolver = new AnyProviderResolver(container);

    this.resolvers = [
      new TransientScopeResolver(providerResolver),
      new SingletonScopeResolver(providerResolver)
    ];
  }

  public resolve<T>(binding: Binding<T>): T {
    for(const resolver of this.resolvers) {
      if (resolver.canResolve(binding))
        return resolver.resolve<T>(binding);
    }

    throw new BindingResolutionException(binding.token);
  }

}
