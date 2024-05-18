import type {Class, Token} from '@/utils/types.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';

export interface BindingCapable {
  bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T extends Class<infer I> ? I : T>;
}
