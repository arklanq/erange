import type { Class } from '@/utils/types.js';

export interface ClassInjector<C extends Class<unknown>> {
  createClassInstance(): InstanceType<C>;
}
