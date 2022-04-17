import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'findByPropertyValue',
  pure: false
})
export class FindByPropertyValuePipe implements PipeTransform {

  transform(items: any[], property: string, value: any): any {
    if (!items || !property || !value) {
      return items;
    }
    return items.find((item: any) => item[property] === value);
  }
}

// usage:
// <span>{{(requestStatusesList | findByPropertyValue:'id': adPublic.ad.provinceId)?.name}}</span>
