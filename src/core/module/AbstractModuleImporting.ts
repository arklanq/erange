import {ModuleImportException} from '@/exceptions/ModuleImportException.js';
import type {Class} from '@/utils/types.js';
import type {AbstractModule} from './AbstractModule.js';
import type {AbstractModuleContext} from './AbstractModuleContext.js';
import {AbstractModuleInitialization} from './AbstractModuleInitialization.js';
import {AbstractModuleMeta} from './AbstractModuleMeta.js';

export class AbstractModuleImporting {
  public constructor(private readonly meta: AbstractModuleMeta) {}

  public async import<M extends AbstractModule>(moduleClazz: Class<M>): Promise<void> {
    try {
      const context: AbstractModuleContext = this.meta.context;
      let moduleInstance: M;

      if (context.modulesRegistry.has(moduleClazz)) {
        moduleInstance = context.modulesRegistry.get(moduleClazz) as M;
      } else {
        moduleInstance = await AbstractModuleInitialization.initialize(
          false,
          moduleClazz,
          this.meta.context,
          this.meta.treeDrawer,
        );
      }

      const moduleMeta = AbstractModuleMeta.access(moduleInstance);
      this.meta.container.import(moduleMeta.container);
    } catch (e: unknown) {
      throw new ModuleImportException(moduleClazz, e);
    }
  }
}
