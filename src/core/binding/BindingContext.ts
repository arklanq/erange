import {AliasProviderFactory} from '../provider/AliasProvider.js';
import {ClassProviderFactory} from '../provider/ClassProvider.js';
import {FactoryProviderFactory} from '../provider/FactoryProvider/FactoryProvider.js';
import {InstanceProviderFactory} from '../provider/InstanceProvider.js';
import type {RegistryGateway} from '../registry/RegistryGateway.js';
import {CustomScopeFactory} from '../scope/CustomScope.js';
import {SingletonScopeFactory} from '../scope/SingletonScope.js';
import {TransientScopeFactory} from '../scope/TransientScope.js';

export interface BindingContext {
  readonly registry: RegistryGateway;
  readonly factory: {
    readonly scope: {
      transient: TransientScopeFactory;
      singleton: SingletonScopeFactory;
      custom: CustomScopeFactory;
    };
    readonly provider: {
      class: ClassProviderFactory;
      instance: InstanceProviderFactory;
      factory: FactoryProviderFactory;
      alias: AliasProviderFactory;
    };
  };
}

export function createBindingContext(registry: RegistryGateway): BindingContext {
  return {
    registry: registry,
    factory: {
      scope: {
        transient: new TransientScopeFactory(),
        singleton: new SingletonScopeFactory(),
        custom: new CustomScopeFactory(),
      },
      provider: {
        class: new ClassProviderFactory(),
        instance: new InstanceProviderFactory(),
        factory: new FactoryProviderFactory(),
        alias: new AliasProviderFactory(),
      },
    },
  };
}

export class DirectiveWithContext {
  protected readonly context: BindingContext;

  public constructor(context: BindingContext) {
    this.context = context;
  }
}
