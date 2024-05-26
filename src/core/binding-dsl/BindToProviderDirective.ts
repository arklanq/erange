import type {Class, Token} from '@/utils/types.js';
import type {Binding} from '../binding/Binding.js';
import type {BindingContext} from '../binding/BindingContext.js';
import type {FactoryProviderFunction} from '../provider/FactoryProvider.js';
import type {SingletonScopeBinding} from '../scope/SingletonScope.js';
import {BindInScopeDirective} from './BindInScopeDirective.js';

export class BindToProviderDirective<O> extends BindInScopeDirective<O> {
  public constructor(context: BindingContext, binding: Binding) {
    super(context, binding);
  }

  public toClass<V>(clazz: Class<V>): BindInScopeDirective<V> {
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
    } satisfies Partial<SingletonScopeBinding<V>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toInstance<V>(instance: V): BindInScopeDirective<V> {
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
    } satisfies Partial<SingletonScopeBinding<V>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toFactory<V>(factory: FactoryProviderFunction<V>): BindInScopeDirective<V> {
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
    } satisfies Partial<SingletonScopeBinding<V>>);

    return new BindInScopeDirective(this.context, this.binding);
  }

  public toAlias<V>(alias: Token): BindInScopeDirective<V> {
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
    } satisfies Partial<SingletonScopeBinding<V>>);

    return new BindInScopeDirective(this.context, this.binding);
  }
}
