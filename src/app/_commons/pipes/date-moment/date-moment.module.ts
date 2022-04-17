import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateMomentPipe } from '@commons/pipes/date-moment/date-moment.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ DateMomentPipe ],
  providers: [ ],
  exports: [ DateMomentPipe ]
})
export class DateMomentModule {
}
