import type {Token} from '@/utils/types.js';
import type {Provider} from '../provider/Provider.js';
import type {EncapsulatedScope} from '../scope/Scope.js';

export interface BindingMeta extends Record<PropertyKey, unknown> {
  export: boolean;
}

export type Binding<V = unknown, S extends EncapsulatedScope = EncapsulatedScope> = {
  token: Token;
  scope: S;
  provider: Provider<V>;
  meta: BindingMeta;
};
