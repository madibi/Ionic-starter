import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterByPropertyValuePipe } from '@commons/pipes/filter-by-property/filter-by-property.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ FilterByPropertyValuePipe ],
  providers: [ ],
  exports: [ FilterByPropertyValuePipe ]
})
export class FilterByPropertyValueModule {
}
