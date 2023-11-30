import {Scope} from '@/utils/types.js';
import type {Provider} from '../provider/Provider.js';
import {AnyProviderResolver} from '../provider/AnyProviderResolver.js';
import type {BindingPrototype} from './BindingPrototype.js';
import type {Binding, BindingResolver} from './Binding.js';

export interface TransientBinding<T> extends BindingPrototype {
  provider: Provider<T>;
  scope: Scope.TRANSIENT;
}

export class TransientBindingResolver implements BindingResolver {
  private readonly providerResolver: AnyProviderResolver;

  public constructor(providerResolver: AnyProviderResolver) {
    this.providerResolver = providerResolver;
  }

  public canResolve(binding: Binding): boolean {
    return binding.scope === Scope.TRANSIENT;
  }

  public resolve<T>(binding: TransientBinding<T>): T {
    return this.providerResolver.resolveProvider(binding.token, binding.provider);
  }

}
