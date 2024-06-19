import type {Exception} from 'enhanced-exception';
import {ModuleConfigurationException} from '@/exceptions/ModuleConfigurationException.js';
import {ModuleImportException} from '@/exceptions/ModuleImportException.js';
import type {Class} from '@/utils/types.js';
import {ModuleClassInjector} from '../class-injector/ModuleClassInjector.js';
import {PerformanceTracker} from '../misc/PerformanceTracker.js';
import {TreeDrawer} from '../misc/TreeDrawer.js';
import type {AbstractModule} from './AbstractModule.js';
import type {AbstractModuleContext} from './AbstractModuleContext.js';
import {AbstractModuleMeta} from './AbstractModuleMeta.js';

export class AbstractModuleInitialization {
  public static async initialize<M extends AbstractModule>(
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
      const moduleMeta = new AbstractModuleMeta(isRoot, context, treeDrawer.createBranch());
      AbstractModuleMeta.attach(moduleInstance, moduleMeta);

      context.modulesRegistry.set(moduleClazz, moduleInstance);

      await moduleInstance.configure();

      const endTime: number = PerformanceTracker.timestamp();
      const performance: string = PerformanceTracker.format(startTime, endTime);
      moduleMeta.treeDrawer.reportModuleTiming(performance);

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
}
