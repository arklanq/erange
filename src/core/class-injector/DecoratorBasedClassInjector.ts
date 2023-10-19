import {Exception} from 'enhanced-exception';
import type {Class, Token} from '@/utils/types.js';
import {ClassInstanceInitializationException} from '@/exceptions/ClassInstanceInitializationException.js';
import {ConstructorArgResolutionException} from '@/exceptions/ConstructorArgResolutionException.js';
import type {Registry} from '../registry/Registry.js';
import type {InjectorMetadataProxy} from '../injector-metadata/InjectorMetadataProxy.js';
import {InjectorMetadataFromClassProxy} from '../injector-metadata/InjectorMetadataFromClassProxy.js';
import {InjectorMetadataProcessor} from '../injector-metadata/InjectorMetadataProcessor.js';
import type {ClassInjector} from './ClassInjector.js';

export class DecoratorBasedClassInjector<Clazz extends Class<unknown>> implements ClassInjector<Clazz> {
  protected readonly registry: Registry;
  protected readonly clazz: Clazz;
  protected readonly injectorMetadataProcessor: InjectorMetadataProcessor;

  public constructor(registry: Registry, clazz: Clazz) {
    this.registry = registry;
    this.clazz = clazz;

    const injectorMetadataProxy: InjectorMetadataProxy = new InjectorMetadataFromClassProxy(clazz);
    this.injectorMetadataProcessor = new InjectorMetadataProcessor(injectorMetadataProxy);
  }

  public createClassInstance(): InstanceType<Clazz> {
    try {
      const resolutionTokens: Token[] | null = this.injectorMetadataProcessor.resolutionTokens;

      if (resolutionTokens == null)
        throw new Exception(
          `Cannot retrive resolution tokens for \`${this.clazz.name}\` class.` +
            ` Is the class decorated with \`@inject\` decorator?`,
        );

      const resolvedArgs: unknown[] = resolutionTokens.map((argToken: Token, argIndex: number) => {
        try {
          return this.registry.resolve(argToken);
        } catch (e: unknown) {
          throw new ConstructorArgResolutionException(this.clazz, resolutionTokens, argIndex, e);
        }
      });

      return new this.clazz(resolvedArgs) as InstanceType<Clazz>;
    } catch (e: unknown) {
      throw new ClassInstanceInitializationException(this.clazz, e);
    }
  }
}
