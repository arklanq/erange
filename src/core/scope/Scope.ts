import type {Binding} from '../binding/Binding.js';
import type {ScopeAnchor} from './ScopeAnchor.js';

export enum Scope {
  TRANSIENT = 'TRANSIENT',
  SINGLETON = 'SINGLETON',
}

/*
 * We cannot add 'CUSTOM' scope as a name to `Scope` enum above
 * because that enum is available publicly (exported by package).
 * On the other hand the `CustomScopeName` type below is truly internal type
 * so we can use it as we wish.
 */
export type CustomScopeName = 'CUSTOM';

export interface EncapsulatedScope<S extends Scope | CustomScopeName = Scope | CustomScopeName> {
  name: S;
}

export interface ScopeFactory {
  create(...args: unknown[]): EncapsulatedScope;
}

export interface ScopeResolver {
  canResolve(binding: Binding, anchor: ScopeAnchor | null): boolean;
  resolve<V, A extends ScopeAnchor>(binding: Binding<V>, scope: A | null): V;
}
