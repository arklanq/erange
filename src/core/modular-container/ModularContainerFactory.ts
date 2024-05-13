import type {ModularContainerInterface} from './ModularContainer.interface.js';
import {ModularContainer} from './ModularContainer.js';
import type {ModularContainerOptions} from './ModularContainerOptions.js';

export class ModularContainerFactory {
  public create(options: ModularContainerOptions): ModularContainerInterface {
    return new ModularContainer(options);
  }
}
