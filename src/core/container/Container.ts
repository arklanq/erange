import {InvalidTokenException} from '@/exceptions/InvalidTokenException.js';
import type {Class, Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import type {BindingContext} from '../binding/BindingContext.js';
import {createBindingContext} from '../binding/BindingContext.js';
import {BindDirective} from '../binding-dsl/BindDirective.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';
import {ClassicClassInjector} from '../class-injector/ClassicClassInjector.js';
import type {ClassInjector} from '../class-injector/ClassInjector.js';
import {createResolutionContext, type ResolutionContext} from '../resolution/ResolutionContext.js';
import type {ContainerInterface as ContainerInterface} from './ContainerInterface.js';
import {type ContainerOptions, defaultOptions} from './ContainerOptions.js';

export class Container implements ContainerInterface {
  protected readonly options: Required<ContainerOptions>;
  protected readonly sharedResolutionContext: ResolutionContext;
  protected readonly sharedBindingContext: BindingContext;

  public constructor(options: ContainerOptions = defaultOptions) {
    this.options = Object.assign({}, defaultOptions, options) as Required<ContainerOptions>;
    this.sharedResolutionContext = createResolutionContext(this);
    this.sharedBindingContext = createBindingContext(this.sharedResolutionContext.registryGateway);
  }

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T extends Class<infer I> ? I : T> {
    if (tokenOrClass == null) throw new InvalidTokenException(tokenOrClass);
    const bindingContext: BindingContext = Object.assign({}, this.sharedBindingContext);
    const bindDirective: BindDirective<T> = new BindDirective<T>(bindingContext);
    return bindDirective.bind(tokenOrClass);
  }

  public resolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T {
    if (token == null) throw new InvalidTokenException(token);
    return this.sharedResolutionContext.registryGateway.resolve<T, NonNullable<S> | null>(token, scope ?? null);
  }

  public tryResolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T | null {
    if (token == null) throw new InvalidTokenException(token);
    return this.sharedResolutionContext.registryGateway.tryResolve<T, NonNullable<S> | null>(token, scope ?? null);
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    if (clazz == null) throw new InvalidTokenException(clazz);
    const injector: ClassInjector<C> = new ClassicClassInjector<C>(this, clazz); // this injector does not need scope information
    return injector.createClassInstance();
  }

  public getBinding<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): Binding<T> {
    return this.sharedResolutionContext.registryGateway.getBinding<T, NonNullable<S> | null>(token, scope ?? null);
  }

  public getAllRegisteredTokens(): Token[] {
    return this.sharedResolutionContext.registryGateway.getAllRegisteredTokens();
  }
}
