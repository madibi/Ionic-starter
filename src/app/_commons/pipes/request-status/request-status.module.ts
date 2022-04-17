import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequestStatusPipe } from '@commons/pipes/request-status/request-status.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ RequestStatusPipe ],
  providers: [ ],
  exports: [ RequestStatusPipe ]
})
export class RequestStatusModule {
}
