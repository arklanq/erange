import {BindingResolutionException} from '@/exceptions/BindingResolutionException.js';
import type {Container} from '../Container.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {Binding, BindingResolver} from './Binding.js';
import {TransientBindingResolver} from './TransientBinding.js';
import {SingletonBindingResolver} from './SingletonBinding.js';

export class AnyBindingResolver {
  protected readonly resolvers: BindingResolver[];

  public constructor(container: Container) {
    const providerResolver: AnyProviderResolver = new AnyProviderResolver(container);

    this.resolvers = [
      new TransientBindingResolver(providerResolver),
      new SingletonBindingResolver(providerResolver)
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
