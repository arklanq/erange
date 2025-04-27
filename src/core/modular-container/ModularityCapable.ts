import type { Token } from '@/utils/types.js';
import type { ModularContainer } from './ModularContainer.js';

export interface ModularityCapable {
  import(container: ModularContainer): void;
  export(token: Token): void;
}
