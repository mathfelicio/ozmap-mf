export interface Syncable<T> {
  fetch(): Promise<T[]>;
  sync(items: T[]): Promise<void>;
  getHierarcy(): number;
}
