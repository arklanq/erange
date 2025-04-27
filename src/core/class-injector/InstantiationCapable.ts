import type { Class } from '@/utils/types.js';

export interface InstantiationCapable {
  instantiate<C extends Class<unknown>>(clazz: C): InstanceType<C>;
}
