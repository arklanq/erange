import type {Token} from '@/utils/types.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';

export interface BindingCapable {
  bind(tokenOrClass: Token): BindToProviderDirective;
}
