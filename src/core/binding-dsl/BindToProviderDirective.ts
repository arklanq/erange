import {type Class, Scope} from '../../utils/types.js';
import type {BindingContext} from './BindingContext.js';
import {BindInScopeDirective} from './BindInScopeDirective.js';
import type {Binding} from '../binding/Binding.js';

export class BindToProviderDirective extends BindInScopeDirective {
  public constructor(context: BindingContext, binding: Binding<unknown>) {
    super(context, binding);
  }

  public toClass<Clazz extends Class<unknown>>(clazz: Clazz): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {class: clazz},
      scope: Scope.TRANSIENT, // default scope for ClassProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toInstance<T>(instance: T): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {instance},
      cache: instance,
      scope: Scope.SINGLETON, // default scope for InstanceProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toFactory<T>(factory: () => T | Promise<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {factory},
      scope: Scope.TRANSIENT, // default scope for FactoryProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }
}
