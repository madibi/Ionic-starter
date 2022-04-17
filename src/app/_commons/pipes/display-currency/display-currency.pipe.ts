import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DisplayCurrency'
})

export class DisplayCurrencyPipe implements PipeTransform {

    transform(currency: number, type: string): any {
        if (currency != null && type != null ) {

            let currencyRialNumber;
            let word = '';

            if (!currency) {
            currencyRialNumber = 0;
            word = 'تومان';
            } else {
                currency = Math.floor(currency / 10);
            }
            let currencyString = currency.toString();
            switch (currencyString) {
            case String(currencyString.match(/^[0-9]{1,3}(0{3}$)/g)):
                currencyRialNumber = currency / 1000;
                word = 'هزار تومان';
                break;
            case String(currencyString.match(/^[0-9]{1,3}(0{6}$)/g)):
                currencyRialNumber = currency / 1000000;
                word = 'میلیون تومان';
                break;
            case String(currencyString.match(/^[0-9]{1,3}(0{9}$)/g)):
                currencyRialNumber = currency / 1000000000;
                word = 'میلیارد تومان';
                break;
            default:
                currencyRialNumber = parseInt(currencyString);
                word = 'تومان';
                break;
            }
            
            if (type == 'value') {
                return currencyRialNumber;
            }
            else {
                return word;
            }
        }
    }
}