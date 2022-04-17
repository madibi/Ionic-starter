import {Inject, Injectable, isDevMode} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BrowserStorageService} from '@commons/services/browser-storage.service';
import {DOCUMENT} from '@angular/common';
import {exhaustMap, map, tap} from 'rxjs/operators';
import {Response} from '@commons/schema/common/model/response.model';
import {RequestCodeRS} from '@commons/schema/user/dto/request-code-rs.dto';
import {environment} from '@environments/environment';
import {VerifyCodeRS} from '@commons/schema/user/dto/verify-code-rs.dto';
import {UserService} from '@commons/store/user/user.service';
import {AuthenticateService} from '@commons/services/authenticate.service';
import {Router} from '@angular/router';
import {SharedInfoService} from '@commons/services/shared-info.service';
import {Store} from '@ngrx/store';
import {UserState} from '@commons/store/user/user.state';
import {UserInfo} from '@commons/schema/user/dto/user-info.dto';
import {UserPrivate} from '@commons/schema/user/dto/user-private.dto';
import {RequestCodeSmsType} from '@commons/schema/user/enum/request-code-sms-type.enum';
import {RequestCodeType} from '@commons/schema/user/enum/request-code-type.enum';
import * as USER_ACTIONS from '@commons/store/user/user.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {

  requestCode$ = createEffect(() => this.actions.pipe(ofType(USER_ACTIONS.requestCode),
    tap(async (props) => {
      // if (props.requestCodeRQ.smsType === RequestCodeSmsType.APP) {
        this.userService.requestCode(props.requestCodeRQ)
          .subscribe(async (res: Response<RequestCodeRS>) => {
          if (res.header.methodInfo.status === true) {
            if (isDevMode() || environment.name === 'develop') {
              const code = res.body.message.split(',')[1];
              this.sharedInfoService.userAssetsInfo.entranceSmsCode = code;
            }
            await this.goToVerificationCode(
              props.requestCodeRQ.type,
              props.requestCodeRQ.smsType,
              props.requestCodeRQ.phonePrefix,
              props.requestCodeRQ.mobileNumber,
              props.requestCodeRQ.recaptchaToken as string,
              res.body.message,
              res.body.sessionInfo,
            );
          } else {
            this.toastrService.error(res.header.methodInfo.message, '');
          }
        });
      // } else {
      //   await this.goToVerificationCode(
      //     props.requestCodeRQ.type,
      //     props.requestCodeRQ.smsType,
      //     props.requestCodeRQ.phonePrefix,
      //     props.requestCodeRQ.mobileNumber,
      //     props.requestCodeRQ.fireBaseToken,
      //     null,
      //     null,
      //   );
      // }
    })
  ),{dispatch: false});

  verifyCode$ = createEffect(() => this.actions.pipe(ofType(USER_ACTIONS.verifyCode),
    exhaustMap((props) => this.userService.verifyCode( {
      smsType: props.smsType,
      phonePrefix: props.phonePrefix,
      mobileNumber: props.mobileNumber,
      sessionInfo: props.sessionInfo,
      code: props.code,
    }).pipe(map((res: Response<VerifyCodeRS>) => {
      if (res.header.methodInfo.status) {
        const accessToken = res.body.token?.accessToken || '';
        const refreshToken = res.body.token?.refreshToken || '';
        const userInfo = res.body.token?.userInfo || null!;
        this.authenticateService.setUserToken(accessToken, refreshToken);
        this.authenticateService.setUserInfo(userInfo);
        this.router.navigateByUrl('/pages/welcome').then();
      }
      return USER_ACTIONS.verifyCodeResponse({
        status: res.body.status, message: res.body.message
      });
    })))
  ), {dispatch: false});

  submitUserProfile$ = createEffect(() => this.actions.pipe(ofType(USER_ACTIONS.submitUserProfile),
    exhaustMap((props) => this.userService.submitUserProfile(props.submitType, props.formData)
      .pipe(map((res: Response<UserInfo<UserPrivate, any>>) => {
      if (res.header.methodInfo.status) {
        this.authenticateService.setUserInfo(res.body);
        this.userState.dispatch(USER_ACTIONS.setProfileFormCondition({isProfileFormEnable: false}));
      }
      return USER_ACTIONS.updateUserInfo({
        userInfo: res.body
      });
    })))
  ), {dispatch: false});

  constructor(
    private actions: Actions,
    private userService: UserService,
    private userState: Store<UserState>,
    private router: Router,
    private authenticateService: AuthenticateService,
    private browserStorageService: BrowserStorageService,
    private sharedInfoService: SharedInfoService,
    private toastrService: ToastrService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  async goToVerificationCode(
    type: RequestCodeType,
    smsType: RequestCodeSmsType,
    phonePrefix: string,
    mobileNumber: string,
    recaptchaToken: string,
    message: string,
    sessionInfo: string,
  ) {
    this.userState.dispatch(
      USER_ACTIONS.requestCodeResponse({
        requestCodeRQ: {
          type,
          smsType,
          phonePrefix,
          mobileNumber,
          recaptchaToken,
        },
        requestCodeRS: {
          message,
          sessionInfo
        },
      }));
    this.toastrService.success('کد احراز هویت به شما پیامک شد', '');
    await this.router.navigate(['auth', 'verify-code']);
  }
}
