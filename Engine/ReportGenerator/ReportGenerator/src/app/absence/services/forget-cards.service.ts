import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResult} from "./models";

@Injectable({
  providedIn: 'root'
})
export class ForgetCardsService {

  constructor(private http: HttpClient) {

  }

  get(from, to, userId, onlyNotAccepted = true): Observable<ApiResult<any>> {

    var url =`/api/ForgetCards/get`

    let params = new HttpParams();
    params = params.append('from', from);
    params = params.append('to', to);
    params = params.append('userId', userId);
    params = params.append('onlyNotAccepted', onlyNotAccepted);


    return this.http.get<ApiResult<any>>(url,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}
