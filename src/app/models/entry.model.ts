export interface IEntry {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ITypedEntry<T> extends IEntry {
  [key: string]: T;
}
