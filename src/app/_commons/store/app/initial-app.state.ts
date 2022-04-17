import { AppState } from '@commons/store/app/app.state';

export const initialAppState: AppState = {
  configuration: {
    language: {
      id: null!,
      languageCode: null!,
      languageLocale: null!,
      phonePrefix: null!,
      flagUrl: null!,
      name: null!,
      direction: null!,
      dateType: null!,
    },
    uI: {
      theme: {
        bgColorLowest: null!,
        bgColorLower: null!,
        bgColorLow: null!,
        bgColor: null!,
        bgColorHigh: null!,
        bgColorHigher: null!,
        bgColorHighest: null!,

        fgColorLowest: null!,
        fgColorLower: null!,
        fgColorLow: null!,
        fgColor: null!,
        fgColorHigh: null!,
        fgColorHigher: null!,
        fgColorHighest: null!,
      },
      appDirection: null!,
      appTheme: null!,
    },
    settings: {
      isWalkThroughSeen: null!,
      currentTargetCountryId: null!,
    },
  },
  rules: null!,
  pageHeader: null!,
  isNotAlive: null!,
  backDestination: null!,
  isBackTransparent: null!,
  goToTop: null!,
  goToBottom: null!,
  currentPage: null!,
};
