import {Injectable} from '@angular/core';
import {AuthenticateService} from '@commons/services/authenticate.service';
import {Configuration} from '@commons/schema/app/dto/configuration.dto';
import {HttpClient} from '@angular/common/http';
import {Response} from '@commons/schema/common/model/response.model';
import {BrowserStorageService} from '@commons/services/browser-storage.service';
import * as App_Actions from '@commons/store/app/app.action';
import {Store} from '@ngrx/store';
import {AppState} from '@commons/store/app/app.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {

  constructor(
    private authenticateService: AuthenticateService,
    private httpClient: HttpClient,
    private browserStorageService: BrowserStorageService,
    private appState: Store<AppState>,
    private router: Router
  ) {
  }

  async initApp(): Promise<Configuration | boolean> {
    // get prev values from local
    let localAppConfiguration: Configuration = this.browserStorageService.get('configuration');
    // check if appConfiguration is empty
    if (localAppConfiguration && Object.keys(localAppConfiguration).length === 0 && localAppConfiguration.constructor === Object) {
      localAppConfiguration = null!;
    };

    return await this.appPreparation(localAppConfiguration) ;
  }

  async checkTokenExpiration(): Promise<boolean> {
    const isTokenExpired = await this.authenticateService.isTokenExpired();
    // always we return true
    return true;
  }

  async appPreparation(localAppConfiguration: { [key: string]: any }): Promise<boolean> {
    try {
      const serverConfig = await this.httpClient
        .get<Response<Configuration>>('v1/app/configuration').toPromise() as any;
      const serverAppConfiguration = serverConfig.body;
      if (!localAppConfiguration) {
        localAppConfiguration = {...serverAppConfiguration};
      } else {
        // check if any local is null, in app crash some properties is changing to null
        for (const [key, value] of Object.entries(localAppConfiguration)) {
          if(localAppConfiguration[key] === null ) {
            localAppConfiguration[key] = serverAppConfiguration[key];
          }
        }

        // check localAppConfiguration properties are equal
        for (const key of Object.keys(serverAppConfiguration)) {
          if(!localAppConfiguration.hasOwnProperty(key)) {
            localAppConfiguration[key] = serverAppConfiguration[key];
          } else {
            for (const childKey of Object.keys(serverAppConfiguration[key])) {
              if(!localAppConfiguration[key].hasOwnProperty(childKey)) {
                localAppConfiguration[key][childKey] = serverAppConfiguration[key][childKey];
              }
            }
          }
        }
      }
      this.appState.dispatch(App_Actions.setupAppConfiguration(localAppConfiguration as Configuration));
      return true;
    }
    catch (exp: any) {
      console.log(exp.message);
      this.router.navigateByUrl('/error/504').then();
      return true;
    }
    finally {

    }
  }

  printLogo() {
    console.log('-------------------------');
    console.log('                         ');
    console.log('  █████  ██████  ██████  ');
    console.log(' ██   ██ ██   ██ ██   ██ ');
    console.log(' ███████ ██████  ██████  ');
    console.log(' ██   ██ ██      ██      ');
    console.log(' ██   ██ ██      ██      ');
    console.log('                         ');
    console.log(' TEL:                    ');
    console.log(' ADDRESS:                ');
    console.log(' WEB:                    ');
    console.log('-------------------------');
  }
}
