import type {InjectorMetadataDTO} from './InjectorMetadataProcessor.js';

export interface InjectorMetadataProxy {
  get(): InjectorMetadataDTO | null;
  set(metadata: InjectorMetadataDTO): void;
  update(metadata: InjectorMetadataDTO): InjectorMetadataDTO;
}
