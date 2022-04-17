import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorHandlingService} from './error-handling.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [],
  providers: [ErrorHandlingService],
  exports: []
})
export class ErrorHandlingModule {}
