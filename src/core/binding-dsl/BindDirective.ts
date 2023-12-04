import type {Token, Class} from '@/utils/types.js';
import {isConstructor} from '@/utils/type-guards.js';
import {serializeToken} from '@/utils/serializeToken.js';
import type {Binding} from '../binding/Binding.js';
import {DirectiveWithContext, type BindingContext} from '../binding/BindingContext.js';
import {BindToProviderDirective} from './BindToProviderDirective.js';

export class BindDirective extends DirectiveWithContext {
  public constructor(context: BindingContext) {
    super(context);
  }

  public bind(tokenOrClass: Token | Class<unknown>): BindToProviderDirective {
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
        // TransientScope - default scope for ClassProvider
        scope: this.context.factory.scope.transient.create(),
      };
    }
    // Otherwise ...
    else {
      const token: Token = serializeToken(tokenOrClass);
      binding = {
        // Simply use raw token
        token: token,
        // InstanceProvider - default provider for plain tokens
        provider: {instance: tokenOrClass},
        // SingletonScope - default scope for InstanceProvider
        scope: this.context.factory.scope.singleton.create(null),
      };
    }

    // Register new binding
    this.context.registry.register(binding, null);

    // And pass it to next directive
    return new BindToProviderDirective(this.context, binding);
  }
}
