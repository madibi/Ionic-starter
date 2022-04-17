import {Inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as App_Actions from '@commons/store/app/app.action';
import {exhaustMap, map, tap} from 'rxjs/operators';
import { AppState } from '@commons/store/app/app.state';
import { Store } from '@ngrx/store';
import {BrowserStorageService} from '@commons/services/browser-storage.service';
import {Configuration} from '@commons/schema/app/dto/configuration.dto';
import {DOCUMENT} from '@angular/common';
import {AppService} from '@commons/store/app/app.service';
import {HttpClient} from '@angular/common/http';
import * as Enum_Actions from '@commons/store/enum/enum.action';
import {EnumState} from '@commons/store/enum/enum.state';
import * as APP_ACTIONS from '@commons/store/app/app.action';
import {Response} from '@commons/schema/common/model/response.model';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { AppTheme } from '@commons/schema/app/enum/app-theme.enum';
import {httpResponseFail} from "@commons/store/app/app.action";

@Injectable()
export class AppEffects {

  setupAppConfiguration$ = createEffect(() => this.actions.pipe(
    ofType(App_Actions.setupAppConfiguration),
    tap( async (props) => {
      await this.initConfiguration('setup', props);
    })
  ),
{dispatch: false});

  changeAppConfiguration$ = createEffect(() => this.actions.pipe(
    ofType(App_Actions.changeAppConfiguration),
    tap( async props => {
      await this.initConfiguration('change', props);
    })
  ), {dispatch: false});

  submitAppCompleteInfo$ = createEffect(() => this.actions.pipe(ofType(APP_ACTIONS.submitAppCompleteInfo),
    exhaustMap((props) => this.appService.submitAppCompleteInfo( props.email, props.password)
      .pipe(map((res: Response<boolean>) => {
        if (res.header.methodInfo.status) {
          this.router.navigateByUrl('/home').then();
        }
        return APP_ACTIONS.updateAppCompleteInfo({
          email: props.email,
          password: props.password
        });
      })))
  ), {dispatch: false});

  httpResponseFail = createEffect(() => this.actions.pipe(
      ofType(App_Actions.httpResponseFail),
      tap( async (props) => {
        console.log(props.message);
      })
    ),
    {dispatch: false});

  constructor(
    private actions: Actions,
    private appState: Store<AppState>,
    private enumState: Store<EnumState>,
    private translateService: TranslateService,
    private browserStorageService: BrowserStorageService,

    private appService: AppService,
    private httpClient: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  private changeAppMenuDirection(dir: string) {
    this.document.documentElement.dir = dir;
  }

  private async initConfiguration(type: 'setup'|'change', props: Configuration): Promise<void> {
    const currentLanguage = `${props.language.languageCode}-${props.language.languageLocale}`;
    if (type === 'setup') {
      await this.translateService.setDefaultLang(currentLanguage);
    } else {
      await this.translateService.use(currentLanguage);
    }
    this.changeAppMenuDirection(props.language.direction);
    const configuration: Configuration = {
      language: {
        id: props.language.id,
        name: props.language.name,
        languageCode: props.language.languageCode,
        languageLocale: props.language.languageLocale,
        phonePrefix: props.language.phonePrefix,
        flagUrl: props.language.flagUrl,
        direction: props.language.direction,
        dateType: props.language.dateType
      },
      settings: {
      },
      uI: {
        theme: props.uI.theme,
        appDirection: props.uI.appDirection,
        appTheme: props.uI.appTheme,
      },
    };
    this.browserStorageService.set('configuration', configuration);
    this.enumState.dispatch(Enum_Actions.getEnums(
      {languageId: props.language.id.toString()}));
    this.appState.dispatch(App_Actions.updateAppConfiguration(
      configuration));
  }

}
