import { Injectable } from '@angular/core';
import { Storage } from '@commons/schema/common/model/storage.model';
import { TempStoring } from '@commons/helpers/temp-storage.helper';
import { LocalStoring } from '@commons/helpers/local-storage.helper';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService implements Storage {

  private storage: Storage;

  constructor(

  ) {
    if (typeof Storage === 'undefined') {
      // If browser doesn't support storage.
      console.warn(
        'Storage in Your Browser not supported or you turned them off, ' +
        'Storage Service will use a fallback strategy instead'
      );
      this.storage = new TempStoring(); // Use TempStorage as a backup plan.
    } else {
      this.storage = new LocalStoring(); // Use regular local storage.
    }
  }

  public get(key: string, defaultValue: any = null): any {
    return this.storage.get(key, defaultValue);
  }

  public set(key: string, value: any): void {
    this.storage.set(key, value);
  }

  public clear(key: string): void {
    this.storage.clear(key);
  }
}
