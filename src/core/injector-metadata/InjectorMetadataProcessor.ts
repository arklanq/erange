import type {Token} from '../../utils/types.js';
import type {InjectorMetadataProxy} from './InjectorMetadataProxy.js';

export const injectorMetadataSymbol = Symbol('tuice-injector-metadata');

export interface InjectorMetadataDTO {
  _constructor?: {
    resolutionTokens: Token[];
  };
}

export class InjectorMetadataProcessor {
  protected readonly proxy: InjectorMetadataProxy;

  public constructor(injectMetadataProxy: InjectorMetadataProxy) {
    this.proxy = injectMetadataProxy;
  }

  public get resolutionTokens(): Token[] | null {
    return this.proxy.get()?._constructor?.resolutionTokens ?? null;
  }

  public set resolutionTokens(tokens: Token[]) {
    const injectorMetadata: InjectorMetadataDTO = {
      _constructor: {resolutionTokens: tokens},
    };

    this.proxy.update(injectorMetadata);
  }
}
