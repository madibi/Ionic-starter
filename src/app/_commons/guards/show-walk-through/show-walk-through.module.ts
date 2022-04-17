import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ShowWalkThroughGuard} from '@commons/guards/show-walk-through/show-walk-through.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [],
  providers: [ShowWalkThroughGuard],
  exports: []
})
export class ShowWalkThroughModule {}
