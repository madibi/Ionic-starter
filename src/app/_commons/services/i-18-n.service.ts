import { Injectable, Inject } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as App_Actions from '@commons/store/app/app.action';
import {Store} from '@ngrx/store';
import {AppState} from '@commons/store/app/app.state';
import {take} from 'rxjs/operators';
import {Language} from '@commons/schema/enum/entity/language.entity';
import {EnumState} from '@commons/store/enum/enum.state';
import {selectAppConfiguration, selectAppLanguage} from '@commons/store/app/app.selector';
import { selectEnumLanguages} from '@commons/store/enum/enum.selector';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public language: Language = null!;
  public languages: Language[] = [];

  constructor(
    private translateService: TranslateService,
    private readonly store: Store,
    private enumState: Store<EnumState>,
    private appState: Store<AppState>,
    private toastrService: ToastrService,
  ) {

    this.store.select(selectAppLanguage).subscribe(
      (language) => {
        if(language) {
          this.language = language;
        }
      }
    );
    this.store.select(selectEnumLanguages).subscribe(
      (languages) => {
        if(languages) {
          this.languages = languages;
        }
      }
    );
  }

  // setupAppLanguageDirection(language, direction) {
  //   this.appState.select(selectAppConfiguration).subscribe((cfg) => {
  //     const newCfg = {cfg, ...{language}, ...{direction}};
  //     this.appState.dispatch(AppActions.setupAppConfiguration(
  //       newCfg));
  //   });
  // }

  async showOptions() {

    this.toastrService.info('---', '');

    // console.log('onDidDismiss resolved with role', role);
  }

  changeAppLanguage(language: Language) {
    this.appState.select(selectAppConfiguration).pipe(take(1)).subscribe((cfg) => {
      const newCfg = {
        ...cfg,
        language
      };
      this.appState.dispatch(App_Actions.changeAppConfiguration(
        newCfg));
    });
  }
}
