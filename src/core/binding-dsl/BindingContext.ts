import type {Registry} from '../registry/Registry.js';

export interface BindingContext {
  readonly registry: Registry;
}

export class DirectiveWithContext {
  protected readonly context: BindingContext;

  public constructor(context: BindingContext) {
    this.context = context;
  }
}
