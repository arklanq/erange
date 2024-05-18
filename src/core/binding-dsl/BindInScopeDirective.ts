import {InvalidScopeException} from '@/exceptions/InvalidScopeException.js';
import type {Binding} from '../binding/Binding.js';
import type {BindingContext} from '../binding/BindingContext.js';
import type {CustomScopeBinding} from '../scope/CustomScope.js';
import {Scope} from '../scope/Scope.js';
import {isValidCustomScopeAnchor, type ScopeAnchor} from '../scope/ScopeAnchor.js';
import type {SingletonScopeBinding} from '../scope/SingletonScope.js';
import {isSingletonScope} from '../scope/SingletonScope.js';
import type {TransientScopeBinding} from '../scope/TransientScope.js';
import {isTransientScope} from '../scope/TransientScope.js';
import {ExportDirective} from './ExportDirective.js';

export class BindInScopeDirective<O> extends ExportDirective<O> {
  public constructor(context: BindingContext, binding: Binding) {
    super(context, binding, null);
  }

  public in(scopeOrAnchor: unknown): ExportDirective<O> {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    switch (true) {
      case scopeOrAnchor === Scope.TRANSIENT: {
        /*
         * Ad. 1. Because we are modifying the `binding` object directly via reference
         * we don't have to change anything at the Registry.
         *
         * Ad. 2. Change the scope only if the scope is different from desired,
         * as overwriting the scope will result in the loss of associated data.
         */
        if (!isTransientScope(this.binding.scope)) {
          Object.assign(this.binding, {
            // TransientScope
            scope: this.context.factory.scope.transient.create(),
          } satisfies Partial<TransientScopeBinding<unknown>>);
        }

        return new ExportDirective<O>(this.context, this.binding, null);
      }

      case scopeOrAnchor === Scope.SINGLETON: {
        /*
         * Ad. 1. Because we are modifying the `binding` object directly via reference
         * we don't have to change anything at the Registry.
         *
         * Ad. 2. Change the scope only if the scope is different from desired,
         * as overwriting the scope will result in the loss of associated data.
         */
        if (!isSingletonScope(this.binding.scope)) {
          Object.assign(this.binding, {
            // SingletonScope
            scope: this.context.factory.scope.singleton.create(null),
          } satisfies Partial<SingletonScopeBinding<unknown>>);
        }

        return new ExportDirective<O>(this.context, this.binding, null);
      }

      case isValidCustomScopeAnchor(scopeOrAnchor): {
        const anchor: ScopeAnchor = scopeOrAnchor;

        // 1. Unregister existing binding from the `defaultRegistryMap`
        this.context.registry.unregister(this.binding, null);

        // 2. Change the scope at `binding` object
        Object.assign(this.binding, {
          // CustomScope
          scope: this.context.factory.scope.custom.create(),
        } satisfies Partial<CustomScopeBinding<unknown>>);

        // 3. Register the binding once again, this  time at `scopedRegistryMap`
        this.context.registry.register(this.binding, anchor);

        return new ExportDirective<O>(this.context, this.binding, anchor);
      }

      default: {
        // If received `scope` argument is not a valid property then throw exception
        throw new InvalidScopeException(this.binding.token, scopeOrAnchor);
      }
    }
  }
}
