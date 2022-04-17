import { createSelector } from '@ngrx/store';
import { AppState } from '@commons/store/app/app.state';

export const appState = (state: any) => state.app;

export const selectApp = createSelector(
    appState,
    (app: AppState) => app
);

export const selectAppConfiguration = createSelector(
  appState,
  (app: AppState) => app.configuration
);

export const selectAppLanguage = createSelector(
  appState,
  (app: AppState) => app.configuration.language
);

export const selectAppDirection = createSelector(
  appState,
  (app: AppState) => app.configuration.language.direction
);

export const selectAppCurrentPage = createSelector(
  appState,
  (app: AppState) => app.currentPage
);

export const selectAppTheme = createSelector(
  appState,
  (app: AppState) => app.configuration.uI.appTheme
);
