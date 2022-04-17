import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquarePage } from './square.page';

const routes: Routes = [
  {
    path: '',
    component: SquarePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquareRoutingModule {}
