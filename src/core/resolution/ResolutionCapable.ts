import type {ResolvedValue, Token} from '@/utils/types.js';

export interface ResolutionCapable {
  resolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T>;
  tryResolve<V = undefined, T extends Token = Token, S extends object | undefined = undefined>(
    token: T,
    scope?: S,
  ): ResolvedValue<V, T> | null;
}
