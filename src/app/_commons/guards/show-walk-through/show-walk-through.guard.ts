import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@commons/store/app/app.state';
import {selectAppConfiguration} from '@commons/store/app/app.selector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Configuration} from '@commons/schema/app/dto/configuration.dto';
import * as AppActions from '@commons/store/app/app.action';

@Injectable()
export class ShowWalkThroughGuard implements CanActivate {

  constructor(
    private router: Router,
    private appState: Store<AppState>,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.appState.select(selectAppConfiguration)
      .pipe(
      map((cfg: Configuration)=>{
        if ( cfg.settings.isWalkThroughSeen ) {
          return true;
        } else {
          const newCfg = {
            ...cfg,
            settings: {
              ...cfg.settings,
              isWalkThroughSeen: true
            }
          };
          this.appState.dispatch(AppActions.changeAppConfiguration(newCfg));
          this.router.navigateByUrl('/walk-through').then();
          return false;
        }

      }
    )
  );
    //   .subscribe((cfg) => {
    //   if(cfg.isWalkThroughSeen) {
    //     return true;
    //   } else {
    //     this.router.navigateByUrl('/walk-through').then();
    //     return false;
    //   }
    // });
  }
}
