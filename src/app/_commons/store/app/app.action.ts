import { createAction, props } from '@ngrx/store';
import {Configuration} from '@commons/schema/app/dto/configuration.dto';
import { AppTheme } from '@commons/schema/app/enum/app-theme.enum';
import { AppDirection } from '@commons/schema/app/enum/app-direction.enum';

export const resetState = createAction(
  '[APP] Reset State'
);

export const setupAppConfiguration = createAction(
  '[APP] Setup App Configuration',
  props<Configuration>()
);

export const changeAppConfiguration = createAction(
  '[APP] Change App Configuration',
  props<Configuration>()
);

export const updateAppConfiguration = createAction(
  '[APP] Update App Configuration',
  props<Configuration>()
);

export const updateAppPageHeader = createAction(
  '[APP] Update App Page Header',
  props<{ pageHeader: string }>()
);

export const submitAppCompleteInfo = createAction(
  '[APP] Submit App Complete Info',
  props<{ email: string; password: string }>()
);

export const updateAppCompleteInfo = createAction(
  '[APP] Update App Complete Info',
  props<{ email: string; password: string }>()
);

export const setCurrentPageName = createAction(
  '[APP] Set Current Page Name',
  props<{pageName: string}>()
);

export const updateAppTheme = createAction(
  '[APP] Update App Theme',
  props<{appTheme: AppTheme}>()
);

export const updateAppDirection = createAction(
  '[APP] Update App Direction',
  props<{appDirection: AppDirection}>()
);

export const httpResponseFail = createAction(
  '[APP] Http Response Fail',
  props<{message: string}>()
);
