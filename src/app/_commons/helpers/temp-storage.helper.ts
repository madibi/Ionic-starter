import { Storage } from '@commons/schema/common/model/storage.model';

export class TempStoring implements Storage {
  private storage:{[key:string]: string} = {}; // Temporary Storage Class Field Memory.

  public get(key: string, defaultValue = null): any {
    const objStr = this.storage[key];
    if (objStr) {
      let parsedObj;
      try {
        parsedObj = JSON.parse(objStr);
      } catch (e) {
        // Not block app if not parsable
        this.clear(key);
      }
      return parsedObj;
    }
    return defaultValue;
  }

  public set(key: string, value: any): void {
    this.storage[key] = JSON.stringify(value); // use stringify for prevent from any change with this service users.
  }

  public clear(key: string): void {
    this.storage[key] = null!;
  }
}
