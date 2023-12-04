import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';

export type RegistryMap = Map<Token, Binding>;

export type ScopedRegistryMap = WeakMap<object, RegistryMap>;

export interface Registry {
  register<T = unknown, S extends object = object>(binding: Binding<T>, scope: S | null): void;

  unregister<T = unknown, S extends object = object>(binding: Binding<T>, scope: S | null): void;

  resolve<T = unknown, S extends object = object>(token: Token, scope: S | null): T;
}
