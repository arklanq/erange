import type {Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';

import type {ScopeAnchor} from '../scope/ScopeAnchor.js';

export type RegistryMap = Map<Token, Binding>;

export type ScopedRegistryMap = WeakMap<ScopeAnchor, RegistryMap>;

export interface Registry {
  register<T = unknown, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<T>, anchor: A | null): void;

  unregister<T = unknown, A extends ScopeAnchor = ScopeAnchor>(binding: Binding<T>, anchor: A | null): void;

  resolve<T = unknown, A extends ScopeAnchor = ScopeAnchor>(token: Token, anchor: A | null): T;
}
