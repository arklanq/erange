import type {SingletonBinding} from './SingletonBinding.js';
import type {TransientBinding} from './TransientBinding.js';

export type Binding<T = unknown> = TransientBinding<T> | SingletonBinding<T>;

export interface BindingResolver {

  canResolve(binding: Binding): boolean;

  resolve<T>(binding: Binding<T>): T;

}
