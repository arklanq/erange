/* === core exports === */

export {Container, type ContainerCreationOptions, container} from './core/Container.js';

export type {Provider} from './core/provider/Provider.js';
export type {ClassProvider} from '@/core/provider/ClassProvider.js';
export type {InstanceProvider} from '@/core/provider/InstanceProvider.js';
export type {FactoryProvider} from '@/core/provider/FactoryProvider.js';
export type {AliasProvider} from '@/core/provider/AliasProvider.js';
export type {FactoryProviderFunction} from './core/provider/FactoryProvider.js';

export type {Registry} from './core/registry/Registry.js';
export {DefaultRegistry} from './core/registry/DefaultRegistry.js';

export {Scope} from '@/core/scope/Scope.js';

/* === core exports end === */

export {inject} from './decorators/inject.js';

export {BindingResolutionException} from './exceptions/BindingResolutionException.js';
export {ProviderResolutionException} from './exceptions/ProviderResolutionException.js';
export {ClassInstanceInitializationException} from './exceptions/ClassInstanceInitializationException.js';

export {type Token, type Class} from './utils/types.js';
