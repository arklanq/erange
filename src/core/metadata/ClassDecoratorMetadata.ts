import type {Class} from '../../utils/types.js';
import {polyfill_decorators_undefinedMetadataPropertyOnContext} from '../../utils/polyfills.js';
import type {MetadataProxy} from './MetadataProxy.js';

export class ClassDecoratorMetadata implements MetadataProxy {
  protected readonly decoratorContext: ClassDecoratorContext<Class<unknown>>;

  public constructor(decoratorContext: ClassDecoratorContext<Class<unknown>>) {
    polyfill_decorators_undefinedMetadataPropertyOnContext(decoratorContext);
    this.decoratorContext = decoratorContext;
  }

  public get(): DecoratorMetadataObject {
    return this.decoratorContext.metadata;
  }

  public update(metadata: DecoratorMetadataObject): DecoratorMetadataObject {
    const metadataObject: DecoratorMetadataObject = this.get();
    return Object.assign(metadataObject, metadata);
  }
}
