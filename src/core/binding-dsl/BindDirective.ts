import {isConstructor} from '@/utils/type-guards.js';
import type {Class, Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {type BindingContext, DirectiveWithContext} from '../binding/BindingContext.js';
import type {SingletonScopeBinding} from '../scope/SingletonScope.js';
import {BindToProviderDirective} from './BindToProviderDirective.js';

export class BindDirective extends DirectiveWithContext {
  public constructor(context: BindingContext) {
    super(context);
  }

  public bind(tokenOrClass: Token): BindToProviderDirective {
    // Create new binding
    let binding: Binding;

    // If token is a class
    if (isConstructor(tokenOrClass)) {
      const clazz: Class<unknown> = tokenOrClass;

      binding = {
        // Class name as token
        token: clazz.name,
        // ClassProvider - default provider for class-based tokens
        provider: {class: clazz},
        // SingletonScope - default scope
        // Do not populate SingletonScope's cache until first resolution
        scope: this.context.factory.scope.singleton.create(),
      } satisfies Partial<SingletonScopeBinding<unknown>>;
    }
    // Otherwise ...
    else {
      const token: Token = tokenOrClass;

      binding = {
        // Simply use raw token
        token: token,
        // InstanceProvider - default provider for plain tokens
        provider: {instance: token},
        // SingletonScope - default scope
        // Do not populate SingletonScope's cache until first resolution
        scope: this.context.factory.scope.singleton.create(),
      } satisfies Partial<SingletonScopeBinding<Token>>;
    }

    // Register new binding
    this.context.registry.register(binding, null);

    // And pass it to next directive
    return new BindToProviderDirective(this.context, binding);
  }
}
