import { Storage } from '@commons/schema/common/model/storage.model';

export class LocalStoring implements Storage {

  public get(key: string, defaultValue = null): any {
    const objStr = localStorage.getItem(key);
    if (objStr) {
      let parsedObj;
      try {
        parsedObj = JSON.parse(objStr);
      } catch (e) {
        // Not block app if not parsable
        console.error(e);
        this.clear(key);
      }
      return parsedObj;
    }
    return defaultValue;
  }

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public clear(key: string): void {
    localStorage.removeItem(key);
  }
}
