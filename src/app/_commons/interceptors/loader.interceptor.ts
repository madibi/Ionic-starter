import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    private excludedRequests: string[] = [];

    constructor(
        private loaderService: LoaderService
    ) { }

    isExcluded( request: HttpRequest<any> ): boolean {
        let isExcluded = false;
        this.excludedRequests.forEach((item) => {
            if ( request.url.includes(item)) {
                isExcluded = true;
            }
        });
        return isExcluded;
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            // this.requests.splice(i, 1);
            this.requests[i] = null!;

            // check if requests are empty
            if (this.requests.filter(r => r != null).length === 0){
                this.requests = [];
            }

            this.loaderService.isLoading.next({
                totalRequests: this.requests.length,
                currentRequestIndex: i,
                percent: null!
            });
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.isExcluded(req)) {

            this.requests.push(req);
            const i = this.requests.indexOf(req);

            // console.log('No of requests--->' + this.requests.length);

            this.loaderService.isLoading.next({
                totalRequests: this.requests.length,
                currentRequestIndex: i,
                percent: null!
            });
            return Observable.create((observer: any) => {
                const subscription = next.handle(req)
                    .subscribe(
                        event => {

                            switch (event.type) {
                                case HttpEventType.Sent:
                                    // console.log('Request sent!');
                                    break;
                                case HttpEventType.ResponseHeader:
                                    // console.log('Response header received!');
                                    break;
                                case HttpEventType.DownloadProgress:
                                    // const percentDownload = Math.round(100 * event.loaded / event.total);
                                    // console.log(`download in progress! ${percentDownload}% of ${event.total}`);
                                    break;
                                case HttpEventType.UploadProgress:
                                    const j = this.requests.indexOf(req);
                                    const percentUpload = Math.round(100 * event.loaded / (event.total as number));
                                    // console.log(`download in progress! ${percentUpload}% of ${event.total}`);
                                    this.loaderService.isLoading.next({
                                        totalRequests: this.requests.length,
                                        currentRequestIndex: j,
                                        percent: percentUpload
                                        });
                                    break;
                                case HttpEventType.Response:
                                    // console.log('Done!', event.body);
                            }

                            if (event instanceof HttpResponse) {
                                this.removeRequest(req);
                                observer.next(event);
                            }
                        },
                        err => {
                          console.log('error: ' + JSON.stringify(err));
                          this.removeRequest(req);
                          observer.error(err);
                        },
                        () => {
                            this.removeRequest(req);
                            observer.complete();
                        });
                // remove request from queue when cancelled
                return () => {
                    this.removeRequest(req);
                    subscription.unsubscribe();
                };
            });
        } else {
            return Observable.create((observer: any) => {
                const subscription = next.handle(req)
                    .subscribe(
                    event => {
                        observer.next(event);
                    },
                    () => {
                    },
                    () => {
                    observer.complete();
                });
            });
        }
    }
}

// https://www.freakyjolly.com/http-global-loader-progress-bar-using-angular-interceptors/
