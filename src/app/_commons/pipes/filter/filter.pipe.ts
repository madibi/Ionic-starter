import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform(list: any[], filterText: string, query: any = "name"): any {
      return list ? list.filter(item => item[query].search(new RegExp(filterText, 'i')) > -1) : [];
    }

}