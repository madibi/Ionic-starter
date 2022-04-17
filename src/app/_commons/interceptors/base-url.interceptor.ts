import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if(request.url.startsWith('/assets/i18n')) {
        return next.handle(request);
      }

        const BASE_URL = this.baseUrl.endsWith('/') ? this.baseUrl.substring(0, this.baseUrl.length - 1) : this.baseUrl;
        const REQ_URL = request.url.startsWith('/') ? request.url.substring(1, request.url.length) : request.url;

        const apiReq = request.clone({ url: `${BASE_URL}/${REQ_URL}` });
        return next.handle(apiReq);
    }
}
