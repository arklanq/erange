import {DirectiveWithContext, type BindingContext} from './BindingContext.js';
import {type Token, type Class, Scope} from '@/utils/types.js';
import {isConstructor} from '@/utils/type-guards.js';
import {serializeToken} from '@/utils/serializeToken.js';
import {BindToProviderDirective} from './BindToProviderDirective.js';
import type {Binding} from '../binding/Binding.js';

export class BindDirective extends DirectiveWithContext {
  public constructor(context: BindingContext) {
    super(context);
  }

  public bind(tokenOrClass: Token | Class<unknown>): BindToProviderDirective {
    let binding: Binding;
    if (isConstructor(tokenOrClass)) {
      const clazz: Class<unknown> = tokenOrClass;
      binding = {
        token: clazz.name,
        provider: {class: clazz},
        scope: Scope.TRANSIENT, // default scope for ClassProvider
      };
    } else {
      const token: Token = serializeToken(tokenOrClass);
      binding = {
        token: token,
        provider: {instance: tokenOrClass},
        cache: null,
        scope: Scope.SINGLETON, // default scope for InstanceProvider
      };
    }

    this.context.registry.register(binding);

    return new BindToProviderDirective(this.context, binding);
  }
}
