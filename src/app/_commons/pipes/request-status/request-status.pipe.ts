import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatus',
})
export class RequestStatusPipe implements PipeTransform {
  transform(val: any) {
    if (val) {
      val = this.statusMapper(val as string);
    }
    return val;
  }
  statusMapper(status: string): string {
    if (status === undefined) {
      return '';
    }
    let str = status.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/NEW/g, 'جدید');
    str = str.replace(/READ/g, 'خوانده شده');
    str = str.replace(/ACCEPTED/g, 'درانتظارپاسخ');
    str = str.replace(/DRAFT/g, 'پیش نویس');
    str = str.replace(/REJECTED/g, 'رد شده');
    str = str.replace(/ANSWERED/g, 'پاسخ داده شده');
    const result = str;
    return result;
  }
}
