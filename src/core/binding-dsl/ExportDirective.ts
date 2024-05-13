import type {Binding} from '../binding/Binding.js';
import type {BindingContext} from '../binding/BindingContext.js';
import type {ScopeAnchor} from '../scope/ScopeAnchor.js';
import {ResolveDirective} from './ResolveDirective.js';

export class ExportDirective extends ResolveDirective {
  public constructor(context: BindingContext, binding: Binding, anchor: ScopeAnchor | null) {
    super(context, binding, anchor);
  }

  public export(): ResolveDirective {
    // Set `export` flag on metadata object
    this.binding.meta.export = true;

    return new ResolveDirective(this.context, this.binding, this.anchor);
  }
}
