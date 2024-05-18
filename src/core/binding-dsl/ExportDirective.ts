import type {Binding} from '../binding/Binding.js';
import type {BindingContext} from '../binding/BindingContext.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';
import {ResolveDirective} from './ResolveDirective.js';

export class ExportDirective<O> extends ResolveDirective<O> {
  public constructor(context: BindingContext, binding: Binding, anchor: ScopeAnchor | null) {
    super(context, binding, anchor);
  }

  public export(): ResolveDirective<O> {
    // Set `export` flag on metadata object
    this.binding.meta.export = true;

    return new ResolveDirective<O>(this.context, this.binding, this.anchor);
  }
}
