import {Container} from './Container.js';
import type {ContainerInterface} from './ContainerInterface.js';
import type {ContainerOptions} from './ContainerOptions.js';

export class ContainerFactory {
  public static create(options: ContainerOptions): ContainerInterface {
    return new Container(options);
  }
}
