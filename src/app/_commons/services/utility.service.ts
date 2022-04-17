import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
    public addDirectionClass(prevClasses: string, newClass: string): string{
      if (prevClasses) {
        prevClasses = prevClasses
          .replace('app-ltr', '')
          .replace('app-rtl', '')
          .trim();
      } else {
        prevClasses = '';
      }
      return (`${prevClasses} ${newClass}`).trim();
    }
}
