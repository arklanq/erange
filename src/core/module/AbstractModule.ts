import {ModuleConfigurationException} from '@/exceptions/ModuleConfigurationException.js';
import {ModuleImportException} from '@/exceptions/ModuleImportException.js';
import type {Class, Token} from '@/utils/types.js';
import type {BindingCapable} from '../binding/BindingCapable.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';
import {ModularContainerFactory} from '../modular-container/ModularContainerFactory.js';
import type {ModularContainerInterface} from '../modular-container/ModularContainerInterface.js';
import type {ResolutionCapable} from '../resolution/ResolutionCapable.js';

export abstract class AbstractModule implements BindingCapable, ResolutionCapable {
  private readonly container: ModularContainerInterface;

  public constructor() {
    this.container = ModularContainerFactory.create({});
  }

  public static async initialize<M extends AbstractModule>(moduleClazz: Class<M>): Promise<M> {
    try {
      const moduleInstance: M = new moduleClazz();
      await moduleInstance.configure(moduleInstance.container);
      return moduleInstance;
    } catch (e: unknown) {
      throw new ModuleConfigurationException(moduleClazz, e);
    }
  }

  public abstract configure(container: ModularContainerInterface): void | Promise<void>;

  public async import<M extends AbstractModule>(moduleClazz: Class<M>): Promise<void> {
    try {
      const moduleInstance: M = await AbstractModule.initialize(moduleClazz);
      this.container.import(moduleInstance.container);
    } catch (e: unknown) {
      throw new ModuleImportException(moduleClazz, e);
    }
  }

  public export(token: Token): void {
    this.container.export(token);
  }

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T extends Class<infer I> ? I : T> {
    return this.container.bind(tokenOrClass);
  }

  public resolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T {
    return this.container.resolve<T, S>(token, scope);
  }

  public tryResolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T | null {
    return this.container.tryResolve<T, S>(token, scope);
  }
}
