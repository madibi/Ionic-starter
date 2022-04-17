
import { Inject, Injectable, OnInit } from '@angular/core';
import { AppTheme } from "@commons/schema/app/enum/app-theme.enum";
import * as APP_ACTIONS from "@commons/store/app/app.action";
import { AppDirection } from "@commons/schema/app/enum/app-direction.enum";
import { selectAppDirection, selectAppTheme } from "@commons/store/app/app.selector";
import { Store } from "@ngrx/store";
import { AppState } from "@commons/store/app/app.state";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  isLTR: boolean = null!;
  isRTL: boolean = null!;
  isLight: boolean = null!;
  isDark: boolean = null!;

  defaultThemeLight: any = {
    bgColorLowest: '',
    bgColorLower: '',
    bgColorLow: '',
    bgColor: '#e7e7e7',
    bgColorHigh: '',
    bgColorHigher: '',
    bgColorHighest: '',

    fgColorLowest: '',
    fgColorLower: '',
    fgColorLow: '',
    fgColor: '#010E17',
    fgColorHigh: '',
    fgColorHigher: '',
    fgColorHighest: '',
  }
  defaultThemeDark: any = {
    bgColorLowest: '',
    bgColorLower: '',
    bgColorLow: '',
    bgColor: '#010E17',
    bgColorHigh: '',
    bgColorHigher: '',
    bgColorHighest: '',

    fgColorLowest: '',
    fgColorLower: '',
    fgColorLow: '',
    fgColor: '#e7e7e7',
    fgColorHigh: '',
    fgColorHigher: '',
    fgColorHighest: '',
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appState: Store<AppState>,
  ) {
    appState.select(selectAppTheme).subscribe((appTheme) => {
      this.isLight = appTheme == AppTheme.LIGHT;
      this.isDark = appTheme == AppTheme.DARK;
      if (this.isLight) {
        this.changeThemeToLight();
      } else {
        this.changeThemeToDark();
      };
    });
    appState.select(selectAppDirection).subscribe((appDirection) => {
      this.isLTR = appDirection == AppDirection.LTR;
      this.isRTL = appDirection == AppDirection.RTL;
      if (this.isLTR) {
        this.document.body.classList.remove('app-rtl');
        this.document.body.classList.add('app-ltr');
      }
      if (this.isRTL) {
        this.document.body.classList.remove('app-ltr');
        this.document.body.classList.add('app-rtl');
      }
    });
  }

  toggleAppDirection() {
    let newAppDirection: AppDirection = null!;
    if (this.isLTR) {
      newAppDirection = AppDirection.LTR;
      this.document.body.classList.remove('app-rtl');
      this.document.body.classList.add('app-ltr');
    };
    if (this.isRTL) {
      newAppDirection = AppDirection.LTR;
      this.document.body.classList.remove('app-ltr');
      this.document.body.classList.add('app-rtl');
    };
    if (newAppDirection) {
      this.appState.dispatch(APP_ACTIONS.updateAppDirection({
        appDirection: newAppDirection
      }));
    }
  }

  toggleAppTheme() {
    if (this.isLight) {
      this.changeThemeToDark();
    } else {
      this.changeThemeToLight();
    };
  }

  changeThemeToDark() {
    for (const key of Object.keys(this.defaultThemeDark)) {
      if (this.defaultThemeDark.hasOwnProperty(key)) {
        document.documentElement.style.setProperty(`--${key}`, this.defaultThemeDark[key]);
      }
    };
    this.document.body.classList.remove('app-light');
    this.document.body.classList.add('app-dark');
    this.appState.dispatch(APP_ACTIONS.updateAppTheme({
      appTheme: AppTheme.DARK
    }));
  }

  changeThemeToLight() {
    for (const key of Object.keys(this.defaultThemeLight)) {
      if (this.defaultThemeLight.hasOwnProperty(key)) {
        document.documentElement.style.setProperty(`--${key}`, this.defaultThemeLight[key]);
      }
    };
    this.document.body.classList.remove('app-dark');
    this.document.body.classList.add('app-light');
    this.appState.dispatch(APP_ACTIONS.updateAppTheme({
      appTheme: AppTheme.LIGHT
    }));
  }
}
