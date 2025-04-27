import {isConstructor} from '@/utils/type-guards.js';
import type {Class} from '@/utils/types.js';
import {emptyStateSymbol} from '../../misc/constants.js';
import type {FactoryProvider} from './FactoryProvider.js';

export interface ClassFactory<V> {
  create(): V;
}

export type ClassFactoryClazz<V> = Class<ClassFactory<V>>;

export function isClassFactory<V>(target: unknown): target is ClassFactoryClazz<V> {
  if (!isConstructor(target)) return false;

  const proto = target.prototype as object;
  return 'create' in proto && typeof proto.create === 'function';
}

export interface FactoryProviderWithClass<V = unknown> {
  factory: ClassFactoryClazz<V>;
  meta: {
    cache: InstanceType<ClassFactoryClazz<V>> | typeof emptyStateSymbol;
  };
}

export function isFactoryProviderWithClass<V>(
  anyFactoryProvider: FactoryProvider,
): anyFactoryProvider is FactoryProviderWithClass<V> {
  return ('meta' satisfies keyof FactoryProviderWithClass) in anyFactoryProvider;
}
