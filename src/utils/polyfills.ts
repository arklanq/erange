/*
 * Fix an issue in swc transpiler where `metadata` property value is undefined on `context` object in any decorator.
 * In order this to work a `Symbol.metadata` polyfill is also required.
 * See https://github.com/swc-project/swc/issues/7957
 */
export function polyfill_decorators_undefinedMetadataPropertyOnContext<Context extends DecoratorContext>(
  context: Context,
): void {
  if (!('metadata' in context) || context.metadata === undefined) {
    Object.defineProperty(context, 'metadata', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: Object.create(null) as object,
    });
  }
}
