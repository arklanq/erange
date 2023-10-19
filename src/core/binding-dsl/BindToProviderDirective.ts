import {type Class, Scope, type Token} from '@/utils/types.js';
import type {BindingContext} from './BindingContext.js';
import {BindInScopeDirective} from './BindInScopeDirective.js';
import type {Binding} from '../binding/Binding.js';
import type {AliasProvider, FactoryProvider, InstanceProvider, ClassProvider} from '../provider/Provider.js';
import {serializeToken} from '@/utils/serializeToken.js';

export class BindToProviderDirective extends BindInScopeDirective {
  public constructor(context: BindingContext, binding: Binding<unknown>) {
    super(context, binding);
  }

  public toClass<T>(clazz: Class<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {class: clazz} satisfies ClassProvider<T>,
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
      provider: {instance} satisfies InstanceProvider<T>,
      cache: instance,
      scope: Scope.SINGLETON, // default scope for InstanceProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toFactory<T>(factory: () => T): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {factory} satisfies FactoryProvider<T>,
      scope: Scope.TRANSIENT, // default scope for FactoryProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toAlias<T>(alias: Token | Class<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      provider: {alias: serializeToken(alias)} satisfies AliasProvider,
      scope: Scope.TRANSIENT, // default scope for AliasProvider
    });

    return new BindInScopeDirective(this.context, this.binding);
  }
}
