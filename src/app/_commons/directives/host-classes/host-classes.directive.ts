import {Directive, HostBinding, Inject} from '@angular/core';
import {selectAppDirection, selectAppTheme} from "@commons/store/app/app.selector";
import {AppDirection} from "@commons/schema/app/enum/app-direction.enum";
import {AppTheme} from "@commons/schema/app/enum/app-theme.enum";
import {Store} from "@ngrx/store";
import {AppState} from "@commons/store/app/app.state";
import {DOCUMENT} from "@angular/common";

@Directive ({
  selector:'[host-classes]'
})
export class HostClassesDirective{

  @HostBinding('class.app-ltr') isLTR: boolean = null!;
  @HostBinding('class.app-rtl') isRTL: boolean = null!;
  @HostBinding('class.app-light') isLight: boolean = null!;
  @HostBinding('class.app-dark') isDark: boolean = null!;

  appDirection$;
  appState$;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appState: Store<AppState>,
  ){
    this.appDirection$ = appState.select(selectAppDirection).subscribe((appDirection) => {
      this.isLTR = appDirection == AppDirection.LTR;
      this.isRTL = appDirection == AppDirection.RTL;
    });
    this.appState$ = appState.select(selectAppTheme).subscribe((appTheme) => {
      this.isLight = appTheme == AppTheme.LIGHT;
      this.isDark = appTheme == AppTheme.DARK;
    });
  }



  ngOnInit(){
  }
}
