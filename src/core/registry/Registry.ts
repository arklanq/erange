import type {Binding} from '../binding/Binding.js';
import type {Token} from '../../utils/types.js';

export type RegistryMap = Map<Token, Binding<unknown>>;

export interface Registry {
  register<T = unknown>(binding: Binding<T>): void;

  resolve<T = unknown>(token: Token): T;
}
