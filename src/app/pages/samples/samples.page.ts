import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Option} from "@commons/schema/enum/dto/option.dto";
import { AppTheme } from '@commons/schema/app/enum/app-theme.enum';
import { Router } from '@angular/router';
import { AppState } from '@commons/store/app/app.state';
import { Store } from '@ngrx/store';
import { EnumState } from '@commons/store/enum/enum.state';
import { AppConfigService } from '@commons/services/app-config.service';
import { selectEnumEnumOptionSample } from '@commons/store/enum/enum.selector';
import { selectAppTheme } from '@commons/store/app/app.selector';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.page.html',
  styleUrls: ['./samples.page.scss'],
})
export class SamplesPage implements OnInit {

  public enumOptionSamples$: Observable<Option[]> = undefined!;
  public appTheme$: Observable<AppTheme> = undefined!;
  public AppTheme = AppTheme;

  constructor(
    private router: Router,
    private appState: Store<AppState>,
    private enumState: Store<EnumState>,
    private appConfigService: AppConfigService,
  ) {
    this.enumOptionSamples$ = enumState.select(selectEnumEnumOptionSample);
    this.appTheme$ = enumState.select(selectAppTheme);
  }

  loginByAppSms() {
    this.router.navigateByUrl('/auth/request-code').then();
  }

  loginByFirebaseSms() {
    this.router.navigate(['/auth/request-code'], {queryParams: { 'sms-type': 'firebase' }}).then();
  }

  toggleAppTheme(appTheme: AppTheme) {
    if (appTheme === AppTheme.DARK) {
      this.appConfigService.changeThemeToDark();
    }
    if (appTheme === AppTheme.LIGHT) {
      this.appConfigService.changeThemeToLight();
    }
  }

  ngOnInit(): void {
  }

}
