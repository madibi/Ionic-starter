import {Action, createReducer, on} from '@ngrx/store';
import { AppState } from '@commons/store/app/app.state';
import { initialAppState } from './initial-app.state';
import * as App_Actions from './app.action';
import { AppTheme } from '@commons/schema/app/enum/app-theme.enum';
import {updateAppDirection} from "./app.action";

const reducer = createReducer(
  initialAppState,

  on(App_Actions.resetState, (state: AppState) => ({ ...state, ...{initialAppState} })),

  on(App_Actions.updateAppConfiguration, (state: AppState, configuration) =>
    ({ ...state,
      configuration: {
        language: {
          id: configuration.language.id,
          languageCode: configuration.language.languageCode,
          languageLocale: configuration.language.languageLocale,
          phonePrefix: configuration.language.phonePrefix,
          flagUrl: configuration.language.flagUrl,
          name: configuration.language.name,
          direction: configuration.language.direction,
          dateType: configuration.language.dateType
        },
        settings: {
        },
        uI: {
          theme: configuration.uI.theme,
          appDirection: configuration.uI.appDirection,
          appTheme: configuration.uI.appTheme
        }
      }
     })
  ),

  on(App_Actions.updateAppTheme, (state: AppState, appTheme) =>
    ({ ...state,
      configuration: {
        ...state.configuration,
        uI: {
          ...state.configuration.uI,
          appTheme: appTheme.appTheme
        }
      }
    })
  ),

  on(App_Actions.updateAppDirection, (state: AppState, appDirection) =>
    ({ ...state,
      configuration: {
        ...state.configuration,
        uI: {
          ...state.configuration.uI,
          appDirection: appDirection.appDirection
        }
      }
    })
  ),

  on(App_Actions.updateAppPageHeader, (state: AppState, {pageHeader}) =>
    ({ ...state,
      pageHeader
    })
  ),
);

export const appReducer = (state: AppState | undefined, action: Action) =>
  reducer(state, action);

