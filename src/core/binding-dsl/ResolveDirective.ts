import {DirectiveWithContext, type BindingContext} from '../binding/BindingContext.js';

import type {Binding} from '../binding/Binding.js';

import type {ScopeAnchor} from '../scope/ScopeAnchor.js';

export class ResolveDirective extends DirectiveWithContext {
  protected readonly binding: Binding;
  protected readonly anchor: ScopeAnchor | null;

  public constructor(context: BindingContext, binding: Binding, anchor: ScopeAnchor | null) {
    super(context);
    this.binding = binding;
    this.anchor = anchor;
  }

  public resolve<T>(): T {
    return this.context.registry.resolve<T>(this.binding.token, this.anchor);
  }
}
