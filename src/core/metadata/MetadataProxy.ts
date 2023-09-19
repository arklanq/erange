export interface MetadataProxy {
  get(): DecoratorMetadataObject | null;

  update(metadata: DecoratorMetadataObject): DecoratorMetadataObject;
}
