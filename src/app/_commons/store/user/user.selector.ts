import {createSelector} from '@ngrx/store';
import {UserState} from '@commons/store/user/user.state';

export const userState = (state: any) => state.user;

export const selectUser = createSelector(
  userState,
  (user: UserState) => user
);

export const selectAuthInfo = createSelector(
  userState,
  (user: UserState) => user.authInfo
);

export const selectUserInfo = createSelector(
  userState,
  (user: UserState) => user.userInfo
);

export const selectUserInfoUser = createSelector(
  userState,
  (user: UserState) => user.userInfo.user
);

export const selectProfileFormStatus = createSelector(
  userState,
  (user: UserState) => user.isProfileFormEnable
);

export const selectCompanyInfoFormStatus = createSelector(
  userState,
  (user: UserState) => user.isCompanyInfoFormEnable
);
