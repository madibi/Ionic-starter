import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisplayCurrencyPipe } from './display-currency.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ DisplayCurrencyPipe ],
  providers: [ ],
  exports: [ DisplayCurrencyPipe ]
})
export class DisplayCurrencyModule {
}
