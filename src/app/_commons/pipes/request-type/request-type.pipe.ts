import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestType',
})
export class RequestTypePipe implements PipeTransform {
  transform(val: any) {
    if (val) {
      val = this.typeMapper(val as string);
    }
    return val;
  }
  typeMapper(status: string): string {
    if (status === undefined) {
      return '';
    }
    let str = status.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/ANSWERED/g, 'پاسخ داده شده');
    str = str.replace(/NEW/g, 'جدید');
    str = str.replace(/ACCEPTED/g, 'درانتظارپاسخ');
    str = str.replace(/DRAFT/g, 'پیش نویس');
    str = str.replace(/REJECTED/g, 'رد شده');
    const result = str;
    return result;
  }
}
