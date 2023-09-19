import {polyfill_decorators_undefinedMetadataPropertyOnContext} from '../utils/polyfills.js';
import type {Class, Token} from '../utils/types.js';
import {Exception} from 'enhanced-exception';
import {InjectorMetadataProcessor} from '../core/injector-metadata/InjectorMetadataProcessor.js';
import type {InjectorMetadataProxy} from '../core/injector-metadata/InjectorMetadataProxy.js';
import {InjectorMetadataFromDecoratorContextProxy} from '../core/injector-metadata/InjectorMetadataFromDecoratorContextProxy.js';

function transformArgumentsToTokensList(args: (Class<unknown> | Token)[]): Token[] {
  return args.reduce((acc: Token[], current: Class<unknown> | Token, index: number) => {
    const argToken: Token = typeof current === 'function' ? current.name : current;

    if (argToken == null)
      throw new Exception(
        `Invalid argument at position \`${index}\` provided to \`@inject\` decorator.` +
          ` Expected class constructor or valid token, instead received \`${String(current)}\`.`,
      );

    return [...acc, argToken];
  }, [] satisfies Token[]);
}

/**
 * @target(CLASS)
 */
export function inject(...args: (Class<unknown> | Token)[]) {
  return function inject_decorator<Clazz extends Class<unknown>>(
    target: Clazz,
    context: ClassDecoratorContext<Clazz>,
  ): void {
    if (typeof target !== 'function') throw new Error(`\`@inject\` decorator is appllicable only to class.`);

    polyfill_decorators_undefinedMetadataPropertyOnContext(context);

    const tokensList: Token[] = transformArgumentsToTokensList(args);

    const injectMetadataProxy: InjectorMetadataProxy = new InjectorMetadataFromDecoratorContextProxy(context);
    const injectorMetadataProcessor: InjectorMetadataProcessor = new InjectorMetadataProcessor(injectMetadataProxy);
    injectorMetadataProcessor.resolutionTokens = tokensList;
  };
}
