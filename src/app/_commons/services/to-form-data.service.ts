import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToFormDataService {

  constructor() {
  }

  makeForm<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const property = formValue[key];
      if (this.isImageInfo(property) || this.isFile(property)) {
        formData.append(key, property);
      } else if (this.isObject(property)) {
        for (const nestedKey of Object.keys(property)) {
          formData.append(`${key}[${nestedKey}]`, property[nestedKey]);
        }
      } else if (this.isSimpleArray(property)) {
        throw new Error('simple array not implemented');
      } else if (this.isArrayOfObject(property)) {
        for (let i = 0; i < property.length; i++) {
          for (const nestedKey of Object.keys(property[i])) {
            formData.append(`${key}[${i}][${nestedKey}]`, property[i][nestedKey]);
          }
        }
      } else {
        formData.append(key, property);
      }
    }
    return formData;
  }

  private isFile(property): boolean {
    return property instanceof File;
  }

  private isObject(property: any): boolean {
    if ( typeof property === 'object' && property !== null && !Array.isArray(property)) {
      return true;
    } else {
      return false;
    }
  }

  private isSimpleArray(property: any): boolean {
    if ( Array.isArray(property) && !this.isObject(property[0])) {
      return true;
    } else {
      return false;
    }
  }

  private isArrayOfObject(property: any): boolean {
    if ( Array.isArray(property) && this.isObject(property[0])) {
      return true;
    } else {
      return false;
    }
  }

  private isImageInfo(property: any): boolean {
    if (!this.isObject(property)) {
      return false;
    }
    const size = Object.keys(property).length;
    if (size !== 4) {
      return false;
    }
    if (
      !property.hasOwnProperty('averageColor') ||
      !property.hasOwnProperty('path') ||
      !property.hasOwnProperty('height') ||
      !property.hasOwnProperty('averageColor')
    ) {
      return false;
    }
    return true;
  }
}
