import {DirectiveWithContext, type BindingContext} from './BindingContext.js';

import type {Binding} from '../binding/Binding.js';

export class ResolveDirective extends DirectiveWithContext {
  protected readonly binding: Binding;

  public constructor(context: BindingContext, binding: Binding) {
    super(context);
    this.binding = binding;
  }

  public resolve<T>(): T {
    return this.context.registry.resolve<T>(this.binding.token);
  }
}
