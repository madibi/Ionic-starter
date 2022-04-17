import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLanguageComponent } from './select-language.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SelectLanguageComponent],
    imports: [CommonModule, NgSelectModule, FormsModule],
  providers: [],
  exports: [SelectLanguageComponent],
})
export class SelectLanguageModule {}
