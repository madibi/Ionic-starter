import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrianglePage } from './triangle.page';
import { TriangleRoutingModule } from './triangle-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TriangleRoutingModule
  ],
  declarations: [TrianglePage]
})
export class TriangleModule {}
