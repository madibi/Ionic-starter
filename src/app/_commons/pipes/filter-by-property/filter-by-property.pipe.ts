import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByPropertyValue',
    pure: false
})
export class FilterByPropertyValuePipe implements PipeTransform {
    transform(items: any[], property: string, value: any): any {
        if (!items || !property || !value) {
            return items;
        }
        return items.filter((item: any) => item[property] === value);
    }
}

