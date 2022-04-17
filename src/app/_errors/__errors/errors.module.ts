import { NgModule } from '@angular/core';
import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './../_errors/errors.component';
import { Error404Component } from '../error-404/error-404.component';

@NgModule({
  declarations: [
    ErrorsComponent,
    Error404Component,
    Error404Component
  ],
  imports: [
    ErrorsRoutingModule
  ],
  providers: []
})
export class ErrorsModule { }
