import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { BrowserStorageService } from '@commons/services/browser-storage.service';
import {switchMap, take} from 'rxjs/operators';
import {AuthenticateService} from '@commons/services/authenticate.service';
import {Store} from '@ngrx/store';
import {AppState} from '@commons/store/app/app.state';
import {selectAppConfiguration} from '@commons/store/app/app.selector';
import * as ENUM_ACTIONS from '@commons/store/enum/enum.action';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private languageId = '';

  constructor(
      private browserStorageService: BrowserStorageService,
      private authenticateService: AuthenticateService,
      private appState: Store<AppState>,
  ) {
    this.appState.select(selectAppConfiguration).subscribe(
      (configuration: any) => {
        if (configuration.language.id) {
          this.languageId = configuration.language.id ? configuration.language.id.toString() : null;
        }
      }
    );
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check if need to skip
    if (httpRequest.headers.get('skip-header-interceptor')) {
      // remove skip property from header
      httpRequest = httpRequest.clone({
        headers: httpRequest.headers.delete('skip-header-interceptor')
      });
      return next.handle(httpRequest);
    }

    return from(this.authenticateService.isTokenExpired())
        .pipe(
            switchMap(() => {
              const token = this.authenticateService.accessToken;
              const apiKey = null;
              // const languageId = this.languageId;
              const headers: any = {};
              // if (!!languageId) { headers.Language_Id = languageId; }
              if (!!token) { headers.Authorization = `Bearer ${token}`; }
              if (!!apiKey) { headers.API_KEY = apiKey; }
              const httpHeaders = new HttpHeaders( headers);
              return next.handle( httpRequest.clone( { headers: httpHeaders }));
            })
        );

    // const token = this.browserStorageService.get(StoringProperty.AccessToken);
    // const headers: any = {};
    // if (!!token) { headers.Authorization = `Bearer ${token}`; }
    // // if (!!apiKey) { headers.API_KEY = apiKey; }
    // const httpHeaders = new HttpHeaders( headers);
    // return next.handle( httpRequest.clone( { headers: httpHeaders }));
    }
  }

