export type Token = PropertyKey;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class<T> = new (...args: any[]) => T;

export enum Scope {
  TRANSIENT = 'TRANSIENT',
  SINGLETON = 'SINGLETON',
}
