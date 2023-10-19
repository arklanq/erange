import {ResolveDirective} from './ResolveDirective.js';
import type {BindingContext} from './BindingContext.js';
import {Scope} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';

export class BindInScopeDirective extends ResolveDirective {
  public constructor(context: BindingContext, binding: Binding<unknown>) {
    super(context, binding);
  }

  public in(scope: Scope): ResolveDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    switch (scope) {
      case Scope.SINGLETON: {
        Object.assign(this.binding, {
          scope: Scope.SINGLETON,
          cache: this.binding.scope === Scope.SINGLETON ? this.binding.cache : null,
        });
        break;
      }
      case Scope.TRANSIENT:
      default: {
        if (this.binding.scope === Scope.SINGLETON) delete this.binding.cache;

        Object.assign(this.binding, {
          scope: Scope.TRANSIENT,
        });
        break;
      }
    }

    return new ResolveDirective(this.context, this.binding);
  }
}
