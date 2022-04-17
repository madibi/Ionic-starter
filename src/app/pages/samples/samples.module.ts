import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SamplesPageRoutingModule } from './samples-routing.module';
import { SamplesPage } from './samples.page';
import { ButtonModule } from '@commons/components/button/button.module';
import { SelectLanguageModule } from '@commons/components/select-language/select-language.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SamplesPageRoutingModule,
    ButtonModule,
    TranslateModule,
    SelectLanguageModule,
  ],
  declarations: [SamplesPage],
})
export class SamplesPageModule {}
