export interface IEntry {
  [key: string]: unknown;
}

export interface ITypedEntry<T> extends IEntry {
  [key: string]: T;
}
