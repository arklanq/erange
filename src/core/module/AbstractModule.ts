import type {Class, ResolvedValue, Token} from '@/utils/types.js';
import type {BindingCapable} from '../binding/BindingCapable.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';
import type {InstantiationCapable} from '../class-injector/InstantiationCapable.js';
import {TreeDrawer} from '../misc/TreeDrawer.js';
import type {ResolutionCapable} from '../resolution/ResolutionCapable.js';
import {type AbstractModuleContext, createContext} from './AbstractModuleContext.js';
import {AbstractModuleInitialization} from './AbstractModuleInitialization.js';
import {AbstractModuleMeta} from './AbstractModuleMeta.js';
import type {AbstractModuleOptions} from './AbstractModuleOptions.js';

export abstract class AbstractModule implements BindingCapable, ResolutionCapable, InstantiationCapable {
  private get meta(): AbstractModuleMeta {
    return AbstractModuleMeta.access(this);
  }

  public abstract configure(): void | Promise<void>;

  public static async createRoot<M extends AbstractModule>(
    moduleClazz: Class<M>,
    options: AbstractModuleOptions,
  ): Promise<M> {
    const context: AbstractModuleContext = createContext(options);
    return await AbstractModuleInitialization.initialize(
      true,
      moduleClazz,
      context,
      new TreeDrawer({indent: 0, logger: context.logger}),
    );
  }

  public async import<M extends AbstractModule>(moduleClazz: Class<M>): Promise<void> {
    return this.meta.importing.import<M>(moduleClazz);
  }

  public export(token: Token): void {
    this.meta.container.export(token);
  }

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T, T extends Class<infer I> ? I : T> {
    return this.meta.binding.bind<T>(tokenOrClass);
  }

  public resolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> {
    return this.meta.container.resolve<V, T, S>(token, scope);
  }

  public tryResolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> | null {
    return this.meta.container.tryResolve<V, T, S>(token, scope);
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    return this.meta.container.instantiate<C>(clazz);
  }
}
