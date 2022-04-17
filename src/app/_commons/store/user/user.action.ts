import { createAction, props } from '@ngrx/store';
import {UserPrivate} from '@commons/schema/user/dto/user-private.dto';
import {UserInfo} from '@commons/schema/user/dto/user-info.dto';
import {Role} from '@commons/schema/user/enum/role.enum';
import {Folder} from '@commons/schema/user/entity/folder.entity';
import {CrudType} from '@commons/schema/common/enum/crud-type.enum';
import {RequestCodeSmsType} from '@commons/schema/user/enum/request-code-sms-type.enum';
import {RequestCodeRQ} from '@commons/schema/user/dto/request-code-rq.dto';
import {RequestCodeRS} from '@commons/schema/user/dto/request-code-rs.dto';

// auth
export const resetState = createAction(
  '[USER] Reset State'
);
export const requestCode = createAction(
  '[USER] Request Code',
  props<{ requestCodeRQ: RequestCodeRQ}>()
);
export const requestCodeResponse = createAction(
  '[USER] Record Code Response',
  props<{ requestCodeRQ: RequestCodeRQ; requestCodeRS: RequestCodeRS}>()
);
export const verifyCode = createAction(
  '[USER] verify Code',
  props<{
    smsType: RequestCodeSmsType;
    phonePrefix: string;
    mobileNumber: string;
    sessionInfo: string;
    code: string;
  }>()
);
export const verifyCodeResponse = createAction(
  '[USER] verify Code Response',
  props<{ status: boolean; message: string }>()
);
export const requestLoginByEmail = createAction(
  '[USER] Request Login By Email',
  props<{ emailAddress: string }>()
);
export const requestCodeResult = createAction(
  '[USER] Request Code result',
  props<{ mobileOrEmail: string; status: string }>()
);
export const updateTokens = createAction(
  '[USER] Update Tokens',
  props<{
    accessToken: string;
    refreshToken: string;
  }>()
);

// user
export const updateUserInfo = createAction(
  '[USER] Update User Info',
  props<{
    userInfo: UserInfo<UserPrivate, Role>;
  }>()
);
export const resetUserInfo = createAction(
  '[USER] Reset User Info'
);
export const updateUserPrivate = createAction(
  '[USER] Update User Private',
  props<{
    userPrivate: UserPrivate;
  }>()
);
export const resetUserPrivate = createAction(
  '[USER] Reset User Private'
);

// forms
export const setProfileFormCondition = createAction(
  '[USER] SET Profile Form Condition',
  props<{ isProfileFormEnable: boolean }>()
);
export const submitUserProfile = createAction(
  '[USER] Submit User Profile',
  props<{ submitType: 'PROFILE' | 'RESUME'; formData: FormData }>()
);
export const setCompanyInfoFormCondition = createAction(
  '[USER] SET Company Info Form Condition',
  props<{ isCompanyInfoFormEnable: boolean }>()
);
export const submitCompanyInfo = createAction(
  '[USER] Submit Company Info',
  props<{ formData: FormData }>()
);

