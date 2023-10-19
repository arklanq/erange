import type {Class, Token} from '@/utils/types.js';

export interface ClassProvider<T = unknown> {
  class: Class<T>;
}

export interface InstanceProvider<T = unknown> {
  instance: T;
}

export interface FactoryProvider<T = unknown> {
  factory: () => T;
}

export interface AliasProvider {
  alias: Token;
}

export type Provider<T = unknown> = ClassProvider<T> | InstanceProvider<T> | FactoryProvider<T> | AliasProvider;
