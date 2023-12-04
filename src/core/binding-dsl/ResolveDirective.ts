import {DirectiveWithContext, type BindingContext} from '../binding/BindingContext.js';

import type {Binding} from '../binding/Binding.js';

export class ResolveDirective extends DirectiveWithContext {
  protected readonly binding: Binding;
  protected readonly scope: object | null;

  public constructor(context: BindingContext, binding: Binding, scope: object | null) {
    super(context);
    this.binding = binding;
    this.scope = scope;
  }

  public resolve<T>(): T {
    return this.context.registry.resolve<T>(this.binding.token, this.scope);
  }
}
