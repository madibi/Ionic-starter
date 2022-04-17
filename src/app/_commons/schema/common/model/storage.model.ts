
export interface Storage {
  get(key: string, defaultValue?: any): any;
  set(key: string, value: any): void;
  clear(key: string): void;
}
