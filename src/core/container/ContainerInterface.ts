import type {Class} from '@/utils/types.js';
import type {BindingCapable} from '../binding/BindingCapable.js';
import type {ResolutionCapable} from '../resolution/ResolutionCapable.js';

export interface ContainerInterface extends BindingCapable, ResolutionCapable {
  instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C>;
}
