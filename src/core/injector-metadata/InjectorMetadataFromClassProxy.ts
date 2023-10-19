import type {InjectorMetadataDTO} from './InjectorMetadataProcessor.js';
import {injectorMetadataSymbol} from './InjectorMetadataProcessor.js';
import {ClassMetadata} from '../metadata/ClassMetadata.js';
import type {Class} from '@/utils/types.js';
import type {InjectorMetadataProxy} from './InjectorMetadataProxy.js';
import type {MetadataProxy} from '../metadata/MetadataProxy.js';

export class InjectorMetadataFromClassProxy implements InjectorMetadataProxy {
  protected readonly metadataProxy: MetadataProxy;

  public constructor(clazz: Class<unknown>) {
    this.metadataProxy = new ClassMetadata(clazz);
  }

  protected get metadata(): DecoratorMetadataObject | null {
    return this.metadataProxy.get();
  }

  protected set metadata(metadata: DecoratorMetadataObject) {
    this.metadataProxy.update(metadata);
  }

  public get(): InjectorMetadataDTO | null {
    if (this.metadata == null) return null;

    if (!(injectorMetadataSymbol in this.metadata)) return null;

    return this.metadata[injectorMetadataSymbol] as InjectorMetadataDTO;
  }

  public set(newInjectorMetadata: InjectorMetadataDTO): void {
    this.metadata = {[injectorMetadataSymbol]: newInjectorMetadata};
  }

  public update(newInjectorMetadata: InjectorMetadataDTO): InjectorMetadataDTO {
    const oldInjectorMetadata: InjectorMetadataDTO = this.get() ?? {};
    const mergedInjectorMetadata: InjectorMetadataDTO = Object.assign(oldInjectorMetadata, newInjectorMetadata);

    this.set(mergedInjectorMetadata);

    return mergedInjectorMetadata;
  }
}
