import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { ErrorHandlingService } from '@commons/services/error-handling/error-handling.service';
import { catchError, map } from 'rxjs/operators';
import {AuthenticateService} from '@commons/services/authenticate.service';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

    isRefreshTokenRequested = false;

    constructor(
        private errorDialogService: ErrorHandlingService,
        private authenticateService: AuthenticateService,
        private toastrService: ToastrService,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                this.isRefreshTokenRequested = false;
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403 && !this.isRefreshTokenRequested) {
                    this.isRefreshTokenRequested = true;
                    this.authenticateService.isTokenExpired().then(async (res) => {
                      this.toastrService.info('دسترسی شما به روز گردید، مجددا سعی نمایید', '');
                    });
                } else {
                  let reason = '';
                  if (error.error && error.error.header) {
                    if (!error.error.header.processInfo.status) {
                      reason = error.error.header.processInfo.message;
                    }

                    if (!error.error.header.methodInfo.status) {
                      reason = error.error.header.methodInfo.message;
                    }
                  } else {
                    reason = 'SERVER IS NOT AVAILABLE';
                  }
                    const data = {
                        reason,
                        message: error?.message,
                        name: error?.name,
                        status: error?.status,
                        statusText: error?.statusText,
                        url: error?.url,
                    };
                    this.errorDialogService.openDialog(data).then();
                 }
              return throwError(error);
            }));
    }
}
