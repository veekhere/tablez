type BooleanValue = true | false;

export type ClassConstructor = new (...args: any[]) => any;

export type RecursivePartial<T extends {}> = {
  [K in keyof T]?: RecursivePartial<T[K]>;
};

export type PickPartial<T extends {}, K extends keyof T, Recursive extends BooleanValue = false> = {
  [P in K]?: Recursive extends true ? RecursivePartial<T[P]> : T[P];
} & Omit<T, K>;

export type OmitPartial<T extends {}, K extends keyof T, Recursive extends BooleanValue = false> = {
  [P in Exclude<keyof T, K>]?: Recursive extends true ? RecursivePartial<T[P]> : T[P];
} & Pick<T, K>;

export type RecursiveReadonly<T extends {}> = {
  readonly [K in keyof T]: RecursiveReadonly<T[K]>;
};

export type PickReadonly<T extends {}, K extends keyof T> = {
  readonly [P in K]: RecursiveReadonly<T[P]>;
} & Omit<T, K>;

export type Arguments<F extends Function> = F extends (...args: infer A) => any ? A : never;
