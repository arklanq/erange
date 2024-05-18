import type {Token} from '@/utils/types.js';
import type {ContainerInterface} from '../container/ContainerInterface.js';

export interface ModularContainerInterface extends ContainerInterface {
  import(container: ContainerInterface): void;
  export(token: Token): void;
}
