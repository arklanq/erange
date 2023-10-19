import type {Class} from '@/utils/types.js';

export interface ClassInjector<Clazz extends Class<unknown>> {
  createClassInstance(): InstanceType<Clazz>;
}
