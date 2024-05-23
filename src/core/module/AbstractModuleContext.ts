import type {Class} from '../../utils/types.js';
import type {Logger} from '../generic/Logger.js';
import type {AbstractModule} from './AbstractModule.js';
import type {AbstractModuleOptions} from './AbstractModuleOptions.js';

export interface AbstractModuleContext {
  logger: Logger;
  modulesRegistry: Map<Class<AbstractModule>, AbstractModule>;
}

export function createContext(options: AbstractModuleOptions): AbstractModuleContext {
  return {
    logger: options?.logger ?? console,
    modulesRegistry: new Map<Class<AbstractModule>, AbstractModule>(),
  };
}
