import {ModularContainer} from './ModularContainer.js';
import type {ModularContainerInterface} from './ModularContainerInterface.js';
import type {ModularContainerOptions} from './ModularContainerOptions.js';

export class ModularContainerFactory {
  public static create(options: ModularContainerOptions): ModularContainerInterface {
    return new ModularContainer(options);
  }
}
