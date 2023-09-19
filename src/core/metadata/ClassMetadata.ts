import type {Class} from '../../utils/types.js';
import type {MetadataProxy} from './MetadataProxy.js';

export class ClassMetadata implements MetadataProxy {
  protected readonly clazz: Class<unknown>;

  public constructor(clazz: Class<unknown>) {
    this.clazz = clazz;
  }

  public get(): DecoratorMetadataObject | null {
    return this.clazz[Symbol.metadata];
  }

  public update(metadata: DecoratorMetadataObject): DecoratorMetadataObject {
    const metadataObject: DecoratorMetadataObject | null = this.get();

    if (metadataObject != null) return Object.assign(metadataObject, metadata);
    else return (this.clazz[Symbol.metadata] = Object.assign(Object.create(null) as DecoratorMetadata, metadata));
  }
}
