import { FactoryValueGenerationException } from '@/exceptions/FactoryValueGenerationException.js';
import type { Token } from '@/utils/types.js';
import { Container } from '../../container/Container.js';
import { emptyStateSymbol } from '../../misc/constants.js';
import type { Provider, ProviderFactory, ProviderResolver } from '../Provider.js';
import {
  type ClassFactory,
  type ClassFactoryClazz,
  type FactoryProviderWithClass,
  isClassFactory,
  isFactoryProviderWithClass,
} from './ClassFactory.js';
import { type FactoryProviderWithFunction, isFunctionFactory } from './FunctionFactory.js';

export type FactoryProvider<V = unknown> = FactoryProviderWithFunction<V> | FactoryProviderWithClass<V>;

export function isFactoryProvider<V>(provider: Provider<V>): provider is FactoryProvider<V> {
  return 'factory' in provider;
}

export class FactoryProviderFactory implements ProviderFactory {
  public create<V>(factory: FactoryProvider<V>['factory']): FactoryProvider<V> {
    if (isClassFactory(factory))
      return {
        factory,
        meta: { cache: emptyStateSymbol },
      };
    if (isFunctionFactory(factory))
      return {
        factory,
      };

    throw new Error(`Invalid factory type \`${typeof factory}\`, expected either factory function or factory class.`);
  }
}

export class FactoryProviderResolver implements ProviderResolver {
  private readonly container: Container;

  public constructor(container: Container) {
    this.container = container;
  }

  public canResolve = isFactoryProvider.bind(this);

  public resolve<V>(provider: FactoryProvider<V>, token: Token): V {
    if (isFactoryProviderWithClass<V>(provider)) {
      let classFactoryInstance: ClassFactory<V>;

      if (provider.meta.cache === emptyStateSymbol) {
        classFactoryInstance = provider.meta.cache = this.container.instantiate<ClassFactoryClazz<V>>(provider.factory);
      } else {
        classFactoryInstance = provider.meta.cache;
      }

      try {
        return classFactoryInstance.create();
      } catch (e: unknown) {
        throw new FactoryValueGenerationException(token, e);
      }
    } else {
      try {
        return provider.factory(this.container);
      } catch (e: unknown) {
        throw new FactoryValueGenerationException(token, e);
      }
    }
  }
}
