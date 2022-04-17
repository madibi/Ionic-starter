import {Component, OnInit} from '@angular/core';
import * as App_Actions from '@commons/store/app/app.action';
import {AppState} from "@commons/store/app/app.state";
import {Store} from "@ngrx/store";
import {selectAppConfiguration, selectAppLanguage} from "@commons/store/app/app.selector";
import {Language} from "@commons/schema/enum/entity/language.entity";
import {take} from "rxjs/operators";
import {EnumState} from "@commons/store/enum/enum.state";
import {environment} from '@environments/environment';
import {selectEnumLanguages} from "@commons/store/enum/enum.selector";

@Component({
  selector: 'app-select-language-component',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent implements OnInit {

  public languages: Language[] = [];
  public currentLanguageId: string = '';
  env = environment;

  constructor(
    private appState: Store<AppState>,
    private enumState: Store<EnumState>,
  ) {
    appState.select(selectAppLanguage).subscribe(
      (value) => {
        if (!this.currentLanguageId && value) {
          this.currentLanguageId = value.id.toString();
        }
      }
    );
    enumState.select(selectEnumLanguages).subscribe(
      (value) => {
        this.languages = value;
       }
    );
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

  ngOnInit(): void {
  }
}


