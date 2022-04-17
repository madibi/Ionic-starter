import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {selectAppLanguage} from "@commons/store/app/app.selector";
import {selectEnumLanguages} from "@commons/store/enum/enum.selector";
import {Store} from "@ngrx/store";
import {AppState} from "@commons/store/app/app.state";
import {EnumState} from "@commons/store/enum/enum.state";
import {Language} from "@commons/schema/enum/entity/language.entity";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-select-country-code-component',
  templateUrl: './select-country-code.component.html',
  styleUrls: ['./select-country-code.component.scss'],
})
export class SelectCountryCodeComponent implements OnInit {

  @Output() updatePhonePrefix: EventEmitter<string> = new EventEmitter();
  public languages: Language[] = [];
  public currentLanguagePhonePrefix: string = '';
  env = environment;

  constructor(
    private appState: Store<AppState>,
    private enumState: Store<EnumState>,
  ) {
    appState.select(selectAppLanguage).subscribe(
      (value) => {
        if (!this.currentLanguagePhonePrefix && value) {
          this.currentLanguagePhonePrefix = value.phonePrefix;
          let self = this;
          setTimeout(() => {
            self.changePhonePrefix(value);
          }, 0)
        }
      }
    );
    enumState.select(selectEnumLanguages).subscribe(
      (value) => {
        this.languages = value;
      }
    );
  }

  changePhonePrefix(language: Language) {
    this.updatePhonePrefix.emit(language.phonePrefix);
  }

  ngOnInit(): void {
  }
}


