import type {ResolvedValue} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import {type BindingContext, DirectiveWithContext} from '../binding/BindingContext.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';

export class ResolveDirective<O> extends DirectiveWithContext {
  protected readonly binding: Binding;
  protected readonly anchor: ScopeAnchor | null;

  public constructor(context: BindingContext, binding: Binding, anchor: ScopeAnchor | null) {
    super(context);
    this.binding = binding;
    this.anchor = anchor;
  }

  public resolve<V = O>(): ResolvedValue<V> {
    return this.context.registry.resolve<V, ScopeAnchor | null>(this.binding.token, this.anchor);
  }
}
