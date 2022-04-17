import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './../_auth/auth.component';
import { RequestCodeComponent } from './../request-code/request-code.component';
import { VerifyCodeComponent } from './../verify-code/verify-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@commons/components/button/button.module';
import { SelectCountryCodeModule } from '@commons/components/select-country-code/select-country-code.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AuthComponent,
    RequestCodeComponent,
    VerifyCodeComponent,
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    SelectCountryCodeModule,
    IonicModule,
  ],
  providers: []
})
export class AuthModule { }
