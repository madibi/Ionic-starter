import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RequestCodeComponent } from "../request-code/request-code.component";
import { VerifyCodeComponent } from "../verify-code/verify-code.component";
import { AuthComponent } from "./../_auth/auth.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: 'request-code',
        component: RequestCodeComponent,
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
