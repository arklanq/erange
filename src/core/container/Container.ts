import { InvalidTokenException } from '@/exceptions/InvalidTokenException.js';
import type { Class, ResolvedValue, Token } from '@/utils/types.js';
import type { Binding } from '../binding/Binding.js';
import type { BindingCapable } from '../binding/BindingCapable.js';
import type { BindingContext } from '../binding/BindingContext.js';
import { createBindingContext } from '../binding/BindingContext.js';
import { BindDirective } from '../binding-dsl/BindDirective.js';
import { BindToProviderDirective } from '../binding-dsl/BindToProviderDirective.js';
import type { ClassInjector } from '../class-injector/ClassInjector.js';
import type { InstantiationCapable } from '../class-injector/InstantiationCapable.js';
import { ProviderClassInjector } from '../class-injector/ProviderClassInjector.js';
import type { ResolutionCapable } from '../resolution/ResolutionCapable.js';
import { createResolutionContext, type ResolutionContext } from '../resolution/ResolutionContext.js';

export class Container implements BindingCapable, ResolutionCapable, InstantiationCapable {
  protected readonly sharedResolutionContext: ResolutionContext;
  protected readonly sharedBindingContext: BindingContext;

  public constructor() {
    this.sharedResolutionContext = createResolutionContext(this);
    this.sharedBindingContext = createBindingContext(this.sharedResolutionContext.registryGateway);
  }

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T, T extends Class<infer I> ? I : T> {
    if (tokenOrClass == null) throw new InvalidTokenException(tokenOrClass);
    const bindingContext: BindingContext = Object.assign({}, this.sharedBindingContext);
    const bindDirective: BindDirective<T> = new BindDirective<T>(bindingContext);
    return bindDirective.bind(tokenOrClass);
  }

  public resolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> {
    if (token == null) throw new InvalidTokenException(token);
    return this.sharedResolutionContext.registryGateway.resolve<V, NonNullable<S> | null>(
      token,
      scope ?? null,
    ) as ResolvedValue<V, T>;
  }

  public tryResolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> | null {
    if (token == null) throw new InvalidTokenException(token);
    return this.sharedResolutionContext.registryGateway.tryResolve<V, NonNullable<S> | null>(
      token,
      scope ?? null,
    ) as ResolvedValue<V, T>;
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    if (clazz == null) throw new InvalidTokenException(clazz);
    const injector: ClassInjector<C> = new ProviderClassInjector<C>(this, clazz); // this injector does not need scope information
    return injector.createClassInstance();
  }

  public getBinding<V = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): Binding<V> {
    return this.sharedResolutionContext.registryGateway.getBinding<V, NonNullable<S> | null>(token, scope ?? null);
  }

  public getAllRegisteredTokens(): Token[] {
    return this.sharedResolutionContext.registryGateway.getAllRegisteredTokens();
  }
}
