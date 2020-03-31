export interface IEntry {
  [key: string]: any;
}

export interface ITypedEntry<T> extends IEntry {
  [key: string]: T;
}
