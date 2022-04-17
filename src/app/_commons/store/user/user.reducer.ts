import {Action, createReducer, on} from '@ngrx/store';
import {
  initialUserState } from './initial-user.state';
import * as USER_ACTIONS from './user.action';
import {UserState} from '@commons/store/user/user.state';

const reducer = createReducer(
  initialUserState,

  on(USER_ACTIONS.requestCodeResponse,
    (state: UserState, { requestCodeRQ, requestCodeRS }) =>
      ({ ...state,
        authInfo: {
        ...state.authInfo,
          ...{type: requestCodeRQ.type},
          ...{smsType: requestCodeRQ.smsType},
          ...{phonePrefix: requestCodeRQ.phonePrefix},
          ...{mobileNumber: requestCodeRQ.mobileNumber},
          ...{recaptchaToken: requestCodeRQ.recaptchaToken as string},
          ...{message: requestCodeRS.message},
          ...{sessionInfo: requestCodeRS.sessionInfo},
        }
        })),

  on(USER_ACTIONS.verifyCodeResponse,
    (state: UserState, { status, message }) =>
      ({ ...state,
        authInfo: {
          ...state.authInfo,
        ...{verifyCodeStatus: status},
        ...{verifyCodeMessage: message}}
      })),

  on(USER_ACTIONS.updateTokens, (
    state: UserState, { accessToken, refreshToken }) =>

    // TODO: why reducer doesn't update company private logo(or child objects)
    ({
      ...state,
      accessToken,
      refreshToken,
    })
  ),

  on(USER_ACTIONS.updateUserInfo, (
    state: UserState, { userInfo }) =>
     ({
      ...state,
       userInfo
    })
  ),

  on(USER_ACTIONS.resetUserInfo, (
    state: UserState) =>
    ({
      ...state,
      userInfo: initialUserState.userInfo
    })
  ),

  on(USER_ACTIONS.updateUserPrivate, (
    state: UserState, { userPrivate }) =>
    ({
      ...state,
      userInfo: {
        ...state.userInfo,
        user: userPrivate
      }
    })
  ),

  on(USER_ACTIONS.resetUserPrivate, (
    state: UserState) =>
    ({
      ...state,
      userInfo: {
        ...state.userInfo,
        user: initialUserState.userInfo.user
      }
    })
  ),

  on(USER_ACTIONS.setProfileFormCondition,
    (state: UserState, { isProfileFormEnable }) =>
      ({ ...state,
        isProfileFormEnable,
      })),

  on(USER_ACTIONS.setCompanyInfoFormCondition,
    (state: UserState, { isCompanyInfoFormEnable }) =>
      ({ ...state,
        isCompanyInfoFormEnable,
      })),

);

export const userReducer = (state: UserState | undefined, action: Action) =>
  reducer(state, action);

