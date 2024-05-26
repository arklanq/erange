export type Token = unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class<T> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractClass<T> = abstract new (...args: any[]) => T;

export type ResolvedValue<V = undefined, T extends Token = Token> = V extends undefined
  ? T extends Class<infer I>
    ? I
    : unknown
  : unknown;
