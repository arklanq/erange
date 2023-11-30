import type {Binding} from '../binding/Binding.js';

export enum Scope {
  TRANSIENT = 'TRANSIENT',
  SINGLETON = 'SINGLETON',
}

export interface EncapsulatedScope<S extends Scope = Scope> {
  name: S;
}

export interface ScopeFactory {

  create(...args: unknown[]): EncapsulatedScope;

}

export interface ScopeResolver {

  canResolve(binding: Binding): boolean;

  resolve<T>(binding: Binding<T>): T;

}
