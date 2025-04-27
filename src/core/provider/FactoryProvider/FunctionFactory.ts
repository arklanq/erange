import { Container } from '../../container/Container.js';
import type { FactoryProviderWithClass } from './ClassFactory.js';
import type { FactoryProvider } from './FactoryProvider.js';

export interface FunctionFactory<V> {
  (container: Container): V;
}

export function isFunctionFactory<V>(target: unknown): target is FunctionFactory<V> {
  return typeof target === 'function';
}

export interface FactoryProviderWithFunction<V = unknown> {
  factory: FunctionFactory<V>;
}

export function isFactoryProviderWithFunction<V>(
  anyFactoryProvider: FactoryProvider,
): anyFactoryProvider is FactoryProviderWithFunction<V> {
  return !(('meta' satisfies keyof FactoryProviderWithClass) in anyFactoryProvider);
}
