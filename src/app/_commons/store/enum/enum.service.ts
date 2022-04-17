import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Response} from '@commons/schema/common/model/response.model';
import {Observable} from 'rxjs';
import {EnumInfo} from "@commons/schema/enum/dto/enum-info.dto";

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private httpClient: HttpClient) { }

  enums(languageId: string): Observable<Response<EnumInfo>> {
    const url = `v1/enum/enumInfo/${languageId}`;
    return this.httpClient.get<Response<EnumInfo>>(url, {});
  }
}
