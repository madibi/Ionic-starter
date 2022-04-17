import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CirclePage } from './circle.page';
import { CircleRoutingModule } from './circle-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CircleRoutingModule
  ],
  declarations: [CirclePage]
})
export class CircleModule {}
