import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '@commons/schema/common/model/response.model';
import {Configuration} from '@commons/schema/app/dto/configuration.dto';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  async configuration(): Promise<Response<Configuration> | undefined> {
    return await this.httpClient
      .get<Response<Configuration>>('v1/app/configuration', {})
      .toPromise();
  }

  getAppRules(languageCode: string): Observable<Response<string>> {
    const url = `v1/app/page/rules/${languageCode}`;
    return this.httpClient.get<Response<string>>(url);
  }

  submitAppCompleteInfo(email: string, password: string): Observable<Response<boolean>> {
    return this.httpClient.post<Response<boolean>>('v1/user/completeInfo', {
      email,
      password
    });
  }
}
