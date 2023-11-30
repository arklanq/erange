import type {Token, Class} from '@/utils/types.js';
import {serializeToken} from '@/utils/serializeToken.js';
import type {Registry} from './registry/Registry.js';
import {BindToProviderDirective} from './binding-dsl/BindToProviderDirective.js';
import {DecoratorBasedClassInjector} from './class-injector/DecoratorBasedClassInjector.js';
import type {BindingContext} from './binding-dsl/BindingContext.js';
import {BindDirective} from './binding-dsl/BindDirective.js';
import {DefaultRegistry} from './registry/DefaultRegistry.js';
import type {ClassInjector} from './class-injector/ClassInjector.js';
import {ClassicClassInjector} from './class-injector/ClassicClassInjector.js';
import {createBindingContext} from './binding-dsl/BindingContext.js';

export interface ContainerCreationOptions {
  unstable_useNewDecoratorsSyntax?: boolean;
}

const defaultOptions: ContainerCreationOptions = {
  unstable_useNewDecoratorsSyntax: false,
};

export class Container {
  protected readonly registry: Registry;
  protected readonly options: Required<ContainerCreationOptions>;
  protected sharedBindingContext: BindingContext;

  public constructor(options: ContainerCreationOptions = defaultOptions) {
    this.registry = new DefaultRegistry(this);
    this.options = Object.assign({}, defaultOptions, options) as Required<ContainerCreationOptions>;
    this.sharedBindingContext = createBindingContext(this.registry);
  }

  public bind(tokenOrClass: Token | Class<unknown>): BindToProviderDirective {
    const bindingContext: BindingContext = Object.assign({}, this.sharedBindingContext);
    const bindDirective: BindDirective = new BindDirective(bindingContext);
    return bindDirective.bind(tokenOrClass);
  }

  public resolve<TInstance>(tokenOrClass: Token | Class<TInstance>): TInstance {
    return this.registry.resolve<TInstance>(serializeToken(tokenOrClass));
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    const injector: ClassInjector<C> = this.options.unstable_useNewDecoratorsSyntax
      ? new DecoratorBasedClassInjector<C>(this.registry, clazz)
      : new ClassicClassInjector<C>(this, clazz);

    return injector.createClassInstance();
  }
}

export const container: Container = new Container();
