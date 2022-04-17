import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirclePage } from './circle.page';

const routes: Routes = [
  {
    path: '',
    component: CirclePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircleRoutingModule {}
