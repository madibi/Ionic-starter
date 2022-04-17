import {Component, isDevMode, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AppState} from "@commons/store/app/app.state";
import {Store} from "@ngrx/store";
import {UserState} from "@commons/store/user/user.state";
import {ActivatedRoute, Router} from "@angular/router";
import * as USER_ACTIONS from '@commons/store/user/user.action';
import {RequestCodeType} from "@commons/schema/user/enum/request-code-type.enum";
import {RequestCodeSmsType} from "@commons/schema/user/enum/request-code-sms-type.enum";
import {configuration} from '@commons/settings/configuration';
import {initializeApp} from 'firebase/app';
import {getAuth, RecaptchaVerifier} from 'firebase/auth';
import {Language} from "@commons/schema/enum/entity/language.entity";
import {selectAppLanguage} from "@commons/store/app/app.selector";

@Component({
  selector: 'request-code-component',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss'],
})
export class RequestCodeComponent implements OnInit {

  requestCodeForm: FormGroup = null!;
  public isDevMode = isDevMode;
  env = environment;
  currentLanguage: Language = null!;
  smsType: RequestCodeSmsType = RequestCodeSmsType.APP;

  constructor(
    private appState: Store<AppState>,
    private userState: Store<UserState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    appState.select(selectAppLanguage).subscribe(
      (value) => {
        this.currentLanguage = value;
      }
    );
    this.requestCodeForm = this.formBuilder.group({
      phonePrefix: ['', null],
      mobileNumber: ['', null],
    });
  }

  updatePhonePrefix(phonePrefix: string) {
    this.requestCodeForm.controls['phonePrefix'].patchValue(phonePrefix);
  }

  onRequestCode() {
    const phonePrefix = this.requestCodeForm.controls['phonePrefix'].value.toString();
    const mobileNumber = this.requestCodeForm.controls['mobileNumber'].value.toString();

    if (this.smsType === RequestCodeSmsType.APP) {
      this.userState.dispatch(
        USER_ACTIONS.requestCode({requestCodeRQ : {
            type: RequestCodeType.MOBILE,
            smsType: RequestCodeSmsType.APP,
            phonePrefix,
            mobileNumber,
            recaptchaToken: '',
          }
        })
      );
    } else {
      const firebaseConfig = configuration.firebaseConfig;
      const firebaseApp = initializeApp(firebaseConfig);
      const firebaseAuth = getAuth(firebaseApp);
      firebaseAuth.languageCode = this.currentLanguage.languageCode;
      const firebaseRecaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {size: 'invisible'}, firebaseAuth);
      firebaseRecaptchaVerifier.clear();
      firebaseRecaptchaVerifier.verify().then((recaptchaToken) => {
        this.userState.dispatch(
          USER_ACTIONS.requestCode({ requestCodeRQ : {
              type: RequestCodeType.MOBILE,
              smsType: RequestCodeSmsType.FIREBASE,
              phonePrefix,
              mobileNumber,
              recaptchaToken,
            }
          })
        );
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.smsType = RequestCodeSmsType.APP;
      if (params && params['sms-type'] && params['sms-type'].toLowerCase() === 'firebase') {
        this.smsType = RequestCodeSmsType.FIREBASE;
      }
    });
  }
}


