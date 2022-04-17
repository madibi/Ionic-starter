import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorsComponent } from "./../_errors/errors.component";
import { Error404Component } from "./../error-404/error-404.component";
import { Error504Component } from "../error-504/error-504.component";

const routes: Routes = [
  {
    path: "",
    component: ErrorsComponent,
    children: [
      {
        path: "404",
        component: Error404Component
      },
      {
        path: "504",
        component: Error504Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
