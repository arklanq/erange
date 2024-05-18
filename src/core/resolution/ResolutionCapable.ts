import type {Token} from '@/utils/types.js';

export interface ResolutionCapable {
  resolve<T, S extends object | undefined = undefined>(token: Token, scope?: S): T;
  tryResolve<T, S extends object | undefined = undefined>(token: Token, scope?: S): T | null;
}
