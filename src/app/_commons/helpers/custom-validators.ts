import {AbstractControl, FormControl} from '@angular/forms';
import {NationalCodeService} from 'ngx-persian';

export class CustomValidators {

    constructor(private nationalCodeService: NationalCodeService) {
    }

    static url(control: AbstractControl) {

        if (!control.value) {
            return null;
        }

        const validUrlRegEx =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?(\?.*)?$/;

        const isValidUrl = validUrlRegEx.test(control.value);

        return isValidUrl ? null : {url: true};
    }

    static httpProtocol(control) {
        if (!control.value) {
            return null;
        }

        return !/(http(s?)):\/\//.test(control.value) ? {httpProtocol: true} : null;

    }

    static confirmPassword(passwordKey: string, confirmPasswordKey: string) {
        return (formGroup) => {
            const password = formGroup.controls[passwordKey];
            const confirmPassword = formGroup.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                confirmPassword.setErrors({passwordMismatch: true});
            }
        };
    }

    static phone(control) {
        if (!control.value) {
            return null;
        }
    return !/(^[9][0-9]{9}$)|(^[0][9][0-9]{9}$)/g.test(control.value) ? {phone: true} : null;

    }

    static validateEmail(email) {
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExpression.test(String(email).toLowerCase());
    }

    static validateIban(iban) {
        const validUrlRegEx = /(\b(I|i)(R|r)[0-9]{2}(?:[ -]?[0-9]{4}){5}(?!(?:[ -]?[0-9]){3})(?:[ -]?[0-9]{2})?\b)|^$/;
        return validUrlRegEx.test(iban);
    }

    static nationalCode(code){
      const L= code.length;
      if ( L<8 || parseInt(code,10) === 0) {return false;}
        code = ('0000'+code).substr(L+4-10);
      if(parseInt(code.substr(3,6),10) === 0) {return false;}
        const c = parseInt(code.substr(9,1),10);
        let s = 0;
      for(let i=0 ; i<9 ; i++)
        {s += parseInt(code.substr(i,1),10)*(10-i);}
        s = s % 11;
        return (s < 2 && c === s) || (s >= 2 && c === (11 - s));
    }

    static requiredFileType( type: string ) {
      return (control: FormControl) => {
        const file = control.value;
        if ( file ) {
          const extension = file.name.split('.')[1].toLowerCase();
          if ( type.toLowerCase() !== extension.toLowerCase() ) {
            return {
              requiredFileType: true
            };
          }

          return null;
        }

        return null;
      };
    }
}
