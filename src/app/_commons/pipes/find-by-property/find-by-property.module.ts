import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {FindByPropertyValuePipe} from '@commons/pipes/find-by-property/find-by-property.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ FindByPropertyValuePipe ],
  providers: [ ],
  exports: [ FindByPropertyValuePipe ]
})
export class FindByPropertyValueModule {
}
