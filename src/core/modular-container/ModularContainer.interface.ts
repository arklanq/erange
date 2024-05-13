import type {Token} from '@/utils/types.js';
import type {ContainerInterface} from '../container/Container.interface.js';

export interface ModularContainerInterface {
  import(container: ContainerInterface): void;
  export(token: Token): void;
}
