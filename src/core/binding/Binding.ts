import type {Provider} from '../provider/Provider.js';
import {Scope, type Token} from '@/utils/types.js';

export interface BindingPrototype {
  token: Token;
}

export interface TransientBinding<T> extends BindingPrototype {
  provider: Provider<T>;
  scope: Scope.TRANSIENT;
}

export interface SingletonBinding<T> extends BindingPrototype {
  provider: Provider<T>;
  scope: Scope.SINGLETON;
  cache: T | null;
}

export type Binding<T> = TransientBinding<T> | SingletonBinding<T>;
