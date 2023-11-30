import {ResolveDirective} from './ResolveDirective.js';
import type {BindingContext} from './BindingContext.js';
import type {Binding} from '../binding/Binding.js';
import {Scope} from '../scope/Scope.js';
import type {TransientScopeBinding} from '../scope/TransientScope.js';
import type {SingletonScopeBinding} from '../scope/SingletonScope.js';

export class BindInScopeDirective extends ResolveDirective {
  public constructor(context: BindingContext, binding: Binding) {
    super(context, binding);
  }

  public in(scope: Scope): ResolveDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    switch(scope) {
      case Scope.TRANSIENT: {
        /*
         * Change the scope only if the scope is different from desired,
         * as overwriting the scope will result in the loss of its data.
         */
        if (this.binding.scope.name !== Scope.TRANSIENT) {
          Object.assign(this.binding, {
            // TransientScope
            scope: this.context.factory.scope.transient.create(),
          } satisfies Partial<TransientScopeBinding<unknown>>);
        }
        break;
      }
      case Scope.SINGLETON: {
        /*
         * Change the scope only if the scope is different from desired,
         * as overwriting the scope will result in the loss of its data.
         */
        if (this.binding.scope.name !== Scope.SINGLETON) {
          Object.assign(this.binding, {
            // SingletonScope
            scope: this.context.factory.scope.singleton.create(null),
          } satisfies Partial<SingletonScopeBinding<unknown>>);
        }
        break;
      }
      default: {
        //TODO: ... Custom scope
        break;
      }
    }

    return new ResolveDirective(this.context, this.binding);
  }
}
