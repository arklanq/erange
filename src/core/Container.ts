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

export interface ContainerCreationOptions {
  unstable_useNewDecoratorsSyntax?: boolean;
}

const defaultOptions: ContainerCreationOptions = {
  unstable_useNewDecoratorsSyntax: false,
};

export class Container {
  protected readonly registry: Registry;
  protected readonly options: Required<ContainerCreationOptions>;

  public constructor(options: ContainerCreationOptions = defaultOptions) {
    this.registry = new DefaultRegistry(this);
    this.options = Object.assign({}, defaultOptions, options) as Required<ContainerCreationOptions>;
  }

  public bind(tokenOrClass: Token | Class<unknown>): BindToProviderDirective {
    const bindingContext: BindingContext = {registry: this.registry};
    const bindDirective: BindDirective = new BindDirective(bindingContext);
    return bindDirective.bind(tokenOrClass);
  }

  public resolve<TInstance>(tokenOrClass: Token | Class<TInstance>): TInstance {
    return this.registry.resolve<TInstance>(serializeToken(tokenOrClass));
  }

  public instantiate<T>(clazz: Class<T>): T {
    const injector: ClassInjector<Class<T>> = this.options.unstable_useNewDecoratorsSyntax
      ? new DecoratorBasedClassInjector<Class<T>>(this.registry, clazz)
      : new ClassicClassInjector<Class<T>>(this, clazz);

    return injector.createClassInstance();
  }
}

export const container: Container = new Container();
