import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResult} from "./models";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }


  get(from, to, userId, onlyNotAccepted = true): Observable<ApiResult<any>> {
    var url =`/api/Users/get`
    return this.http.get<ApiResult<any>>(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

}
