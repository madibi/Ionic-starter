import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DebounceClickDirectivce } from './debounce-click.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ DebounceClickDirectivce ],
  exports: [ DebounceClickDirectivce ]
})
export class DebounceClickModule {
}
