import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {SafeHtmlPipe} from '@commons/pipes/safe-html/safe-html.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
  declarations: [ SafeHtmlPipe ],
  providers: [ ],
  exports: [ SafeHtmlPipe ]
})
export class SafeHtmlModule {
}
