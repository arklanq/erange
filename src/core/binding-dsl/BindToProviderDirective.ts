import type {Class, Token} from '@/utils/types.js';
import type {BindingContext} from '../binding/BindingContext.js';
import {BindInScopeDirective} from './BindInScopeDirective.js';
import type {Binding} from '../binding/Binding.js';
import type {FactoryProviderFunction} from '../provider/FactoryProvider.js';
import type {SingletonScopeBinding} from '../scope/SingletonScope.js';

export class BindToProviderDirective extends BindInScopeDirective {
  public constructor(context: BindingContext, binding: Binding) {
    super(context, binding);
  }

  public toClass<T>(clazz: Class<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      // ClassProvider
      provider: this.context.factory.provider.class.create(clazz),
      // SingletonScope - default scope
      // Do not populate SingletonScope's cache until first resolution
      scope: this.context.factory.scope.singleton.create(),
    } satisfies Partial<SingletonScopeBinding<T>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toInstance<T>(instance: T): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      // InstanceProvider
      provider: this.context.factory.provider.instance.create(instance),
      // SingletonScope - default scope
      // Do not populate SingletonScope's cache until first resolution
      scope: this.context.factory.scope.singleton.create(),
    } satisfies Partial<SingletonScopeBinding<T>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toFactory<T>(factory: FactoryProviderFunction<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      // FactoryProvider
      provider: this.context.factory.provider.factory.create(factory),
      // SingletonScope - default scope
      // Do not populate SingletonScope's cache until first resolution
      scope: this.context.factory.scope.singleton.create(),
    } satisfies Partial<SingletonScopeBinding<T>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toAlias<T>(alias: Token | Class<T>): BindInScopeDirective {
    /*
     * Because we are modifying directly the object via reference
     * we don't have to change anything at the Registry
     */
    Object.assign(this.binding, {
      // AliasProvider
      provider: this.context.factory.provider.alias.create(alias),
      // SingletonScope - default scope
      // Do not populate SingletonScope's cache until first resolution
      scope: this.context.factory.scope.singleton.create(),
    } satisfies Partial<SingletonScopeBinding<T>>);

    return new BindInScopeDirective(this.context, this.binding);
  }
}
