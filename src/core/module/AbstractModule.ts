import type {Exception} from 'enhanced-exception';
import {ModuleConfigurationException} from '@/exceptions/ModuleConfigurationException.js';
import {ModuleImportException} from '@/exceptions/ModuleImportException.js';
import type {Class, Token} from '@/utils/types.js';
import type {BindingCapable} from '../binding/BindingCapable.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';
import type {InstantiationCapable} from '../class-injector/InstantiationCapable.js';
import {ModuleClassInjector} from '../class-injector/ModuleClassInjector.js';
import {ModularContainer} from '../modular-container/ModularContainer.js';
import type {ResolutionCapable} from '../resolution/ResolutionCapable.js';
import {PerformanceTracker} from '../utilities/PerformanceTracker.js';
import {Property} from '../utilities/Property.js';
import {TreeDrawer} from '../utilities/TreeDrawer.js';
import {type AbstractModuleContext, createContext} from './AbstractModuleContext.js';
import type {AbstractModuleOptions} from './AbstractModuleOptions.js';

export abstract class AbstractModule implements BindingCapable, ResolutionCapable, InstantiationCapable {
  private readonly container: ModularContainer;
  private isRoot: Property<boolean> = new Property<boolean>();
  private context: Property<AbstractModuleContext> = new Property<AbstractModuleContext>();
  private treeDrawer: Property<TreeDrawer> = new Property<TreeDrawer>();

  public constructor() {
    this.container = new ModularContainer();
  }

  public abstract configure(): void | Promise<void>;

  public static async createRoot<M extends AbstractModule>(
    moduleClazz: Class<M>,
    options: AbstractModuleOptions,
  ): Promise<M> {
    const context: AbstractModuleContext = createContext(options);
    return await AbstractModule.initialize(
      true,
      moduleClazz,
      context,
      new TreeDrawer({indent: 0, logger: context.logger}),
    );
  }

  private async createChild<M extends AbstractModule>(childModuleClazz: Class<M>): Promise<M> {
    return await AbstractModule.initialize(false, childModuleClazz, this.context.get(), this.treeDrawer.get());
  }

  private static async initialize<M extends AbstractModule>(
    isRoot: boolean,
    moduleClazz: Class<M>,
    context: AbstractModuleContext,
    treeDrawer: TreeDrawer,
  ): Promise<M> {
    treeDrawer.reportModule(moduleClazz);
    try {
      const startTime: number = PerformanceTracker.timestamp();

      const classInjector = new ModuleClassInjector<Class<M>>(moduleClazz);
      const moduleInstance: M = classInjector.createClassInstance();

      moduleInstance.isRoot.set(isRoot);
      moduleInstance.context.set(context);
      moduleInstance.treeDrawer.set(treeDrawer.createBranch());

      await moduleInstance.configure();

      const endTime: number = PerformanceTracker.timestamp();
      const performance: string = PerformanceTracker.format(startTime, endTime);
      moduleInstance.treeDrawer.get().reportModuleTiming(performance);

      return moduleInstance;
    } catch (e: unknown) {
      if (isRoot) {
        let errorWrapper: Exception = new ModuleConfigurationException(moduleClazz, e);

        while (
          errorWrapper.previous instanceof ModuleImportException ||
          errorWrapper.previous instanceof ModuleConfigurationException
        ) {
          errorWrapper = errorWrapper.previous;
        }

        treeDrawer.reportError(errorWrapper);
        throw errorWrapper.previous;
      }

      throw new ModuleConfigurationException(moduleClazz, e);
    }
  }

  public async import<M extends AbstractModule>(moduleClazz: Class<M>): Promise<void> {
    try {
      const context: AbstractModuleContext = this.context.get();
      let moduleInstance: M;

      if (context.modulesRegistry.has(moduleClazz)) {
        moduleInstance = context.modulesRegistry.get(moduleClazz) as M;
      } else {
        moduleInstance = await this.createChild<M>(moduleClazz);
      }

      this.container.import(moduleInstance.container);
    } catch (e: unknown) {
      throw new ModuleImportException(moduleClazz, e);
    }
  }

  public export(token: Token): void {
    this.container.export(token);
  }

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T extends Class<infer I> ? I : T> {
    const startTime: number = PerformanceTracker.timestamp();

    const nextDirective: BindToProviderDirective<T extends Class<infer I> ? I : T> = this.container.bind(tokenOrClass);

    const endTime: number = PerformanceTracker.timestamp();
    const performance: string = PerformanceTracker.format(startTime, endTime);
    this.treeDrawer.get().reportProvider(tokenOrClass, performance);

    return nextDirective;
  }

  public resolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T {
    return this.container.resolve<T, S>(token, scope);
  }

  public tryResolve<T = unknown, S extends object | undefined = undefined>(token: Token, scope?: S): T | null {
    return this.container.tryResolve<T, S>(token, scope);
  }

  public instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C> {
    return this.container.instantiate<C>(clazz);
  }
}
