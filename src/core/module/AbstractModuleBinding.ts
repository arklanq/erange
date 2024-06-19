import type {Class, Token} from '@/utils/types.js';
import {BindToProviderDirective} from '../binding-dsl/BindToProviderDirective.js';
import {PerformanceTracker} from '../utilities/PerformanceTracker.js';
import type {AbstractModuleMeta} from './AbstractModuleMeta.js';

export class AbstractModuleBinding {
  public constructor(private readonly meta: AbstractModuleMeta) {}

  public bind<T extends Token>(tokenOrClass: T): BindToProviderDirective<T, T extends Class<infer I> ? I : T> {
    const startTime: number = PerformanceTracker.timestamp();

    const nextDirective: BindToProviderDirective<T, T extends Class<infer I> ? I : T> = this.meta.container.bind(
      tokenOrClass,
    );

    const endTime: number = PerformanceTracker.timestamp();
    const performance: string = PerformanceTracker.format(startTime, endTime);
    this.meta.treeDrawer.reportProvider(tokenOrClass, performance);

    return nextDirective;
  }
}
