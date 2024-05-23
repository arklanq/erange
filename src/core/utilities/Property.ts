const emptySymbol: unique symbol = Symbol('empty-property-symbol');

export class Property<T> {
  private _prop: T | typeof emptySymbol;

  public constructor(initialProp?: T) {
    this._prop = initialProp === undefined ? emptySymbol : initialProp;
  }

  public get(): T {
    if (this._prop === emptySymbol) throw new Error('Property might not have been initialized.');
    return this._prop;
  }

  public set(newProp: T): void {
    this._prop = newProp;
  }
}
