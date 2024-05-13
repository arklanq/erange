import type {Class, Token} from '@/utils/types.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';

export interface ContainerInterface {
  bind(tokenOrClass: Token): BindToProviderDirective;
  resolve<T, S extends object | undefined = undefined>(token: Token, scope?: S): T;
  tryResolve<T, S extends object | undefined = undefined>(token: Token, scope?: S): T | null;
  instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C>;
}
