import {Scope} from '@/utils/types.js';
import type {Provider} from '../provider/Provider.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {BindingPrototype} from './BindingPrototype.js';
import type {Binding, BindingResolver} from './Binding.js';

export interface SingletonBinding<T> extends BindingPrototype {
  provider: Provider<T>;
  scope: Scope.SINGLETON;
  cache: T | null;
}

export class SingletonBindingResolver implements BindingResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): boolean {
    return binding.scope === Scope.SINGLETON;
  }

  public resolve<T>(binding: SingletonBinding<T>): T {
    if (binding.cache != null) return binding.cache;

    return binding.cache = this.providerResolver.resolveProvider(binding.token, binding.provider);
  }

}
