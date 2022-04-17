import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCountryCodeComponent } from './select-country-code.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SelectCountryCodeComponent],
  imports: [CommonModule, NgSelectModule, FormsModule],
  providers: [],
  exports: [SelectCountryCodeComponent],
})
export class SelectCountryCodeModule {}
