import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from '@ionic/angular';
import { MoveNextByMaxLengthDirective } from './move-next-by-maxLength.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        IonicModule,
    ],
  declarations: [ MoveNextByMaxLengthDirective ],
  exports: [ MoveNextByMaxLengthDirective ]
})
export class MoveNextByMaxLengthModule {
}
