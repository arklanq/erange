import type {Class} from '../../utils/types.js';

export interface ClassProvider<T = unknown> {
  class: Class<T>;
}

export interface InstanceProvider<T = unknown> {
  instance: T;
}

export interface FactoryProvider<T = unknown> {
  factory: () => T;
}

export type Provider<T = unknown> = ClassProvider<T> | InstanceProvider<T> | FactoryProvider<T>;
