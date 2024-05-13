import type {ContainerInterface} from './Container.interface.js';
import {Container} from './Container.js';
import type {ContainerOptions} from './ContainerOptions.js';

export class ContainerFactory {
  public create(options: ContainerOptions): ContainerInterface {
    return new Container(options);
  }
}
