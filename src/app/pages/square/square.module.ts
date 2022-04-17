import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SquarePage } from './square.page';
import { SquareRoutingModule } from './square-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SquarePage }]),
    SquareRoutingModule,
  ],
  declarations: [SquarePage]
})
export class SquareModule {}
