import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindAsyncFormDirective } from './bind-async-form.directive';



@NgModule({
  declarations: [
    BindAsyncFormDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BindAsyncFormDirective
  ]
})
export class SwipeModule { }


