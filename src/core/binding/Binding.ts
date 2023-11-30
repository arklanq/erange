import type {Token} from '@/utils/types.js';
import type {EncapsulatedScope} from '../scope/Scope.js';
import type {Provider} from '../provider/Provider.js';

export type Binding<T = unknown, S extends EncapsulatedScope = EncapsulatedScope> = {
  token: Token;
  scope: S;
  provider: Provider<T>;
}
