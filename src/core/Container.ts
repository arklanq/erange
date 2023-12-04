import type {Token, Class} from '@/utils/types.js';
import {serializeToken} from '@/utils/serializeToken.js';
import type {Registry} from './registry/Registry.js';
import {BindToProviderDirective} from './binding-dsl/BindToProviderDirective.js';
import type {BindingContext} from './binding/BindingContext.js';
import {createBindingContext} from './binding/BindingContext.js';
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

  public resolve<T>(tokenOrClass: Token | Class<T>): T;
  public resolve<T, S extends object = object>(tokenOrClass: Token | Class<T>, scope: S): T;
  public resolve<T, S extends object = object>(tokenOrClass: Token | Class<T>, scope?: S): T {
    return this.registry.resolve<T, S>(serializeToken(tokenOrClass), scope ?? null);
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    const injector: ClassInjector<C> = new ClassicClassInjector<C>(this, clazz); // this injector does not need scope information
    return injector.createClassInstance();
  }
}

export const container: Container = new Container();
