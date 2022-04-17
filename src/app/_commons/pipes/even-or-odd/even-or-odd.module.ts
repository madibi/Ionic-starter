import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EvenOrOddPipe } from '@commons/pipes/even-or-odd/even-or-odd.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ EvenOrOddPipe ],
  providers: [ ],
  exports: [ EvenOrOddPipe ]
})
export class EvenOrOddModule {
}
