import {Component, OnInit, isDevMode} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "@commons/store/app/app.state";
import {Router} from "@angular/router";
import {SharedInfoService} from "@commons/services/shared-info.service";
import {UserState} from "@commons/store/user/user.state";
import {selectAuthInfo} from "@commons/store/user/user.selector";
import * as USER_ACTIONS from '@commons/store/user/user.action';
import {take} from "rxjs/operators";

@Component({
  selector: 'verify-code-component',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {

  public isDevMode = isDevMode;
  verifyCodeForm: FormGroup;

  constructor(
    private appState: Store<AppState>,
    private router: Router,
    private sharedInfoService: SharedInfoService,
    private formBuilder: FormBuilder,
    private userState: Store<UserState>,
  ) {
    this.verifyCodeForm = this.formBuilder.group({
      code: ['', null]
    });
  }

  async verifyCode() {
    // this.router.navigateByUrl('/welcome').then();
    let code = this.verifyCodeForm.get('code');
    let codeValue = code ? code.value.toString() : '';
    const authState = await this.userState.pipe(select(selectAuthInfo),
      take(1)).toPromise() as any;
    this.userState.dispatch(USER_ACTIONS.verifyCode({
      smsType: authState.smsType,
      phonePrefix: authState.phonePrefix,
      mobileNumber: authState.mobileNumber,
      sessionInfo: authState.sessionInfo,
      code: codeValue,
    }));
  }

  ngOnInit(): void {
    if (isDevMode() || environment.name === 'develop') {
      this.verifyCodeForm.controls['code'].patchValue(this.sharedInfoService.userAssetsInfo.entranceSmsCode);
    }
  }
}


