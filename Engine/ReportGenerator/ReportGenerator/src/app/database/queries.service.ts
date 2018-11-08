import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Model, Query} from "../model/model";
import {Observable} from "rxjs";
import {CustomResult, CustomResultGeneric} from "./tables.service";

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) {
  }

  get getRootUrl() {
    const rootUrl = window['rootUrl'];
    if (!rootUrl) {
      console.error('rootUrl is null');
    }
    return rootUrl;
  }


  get getAreaAndPath() {
    return 'api/query/';
  }


  getAllQueries(searchTerm?, lastIndex?,  count?):Observable<CustomResultGeneric<Query[]>>{
    return this.http.get<CustomResultGeneric<Query[]>>(`${this.getRootUrl}${this.getAreaAndPath}/getAll?lastIndex=&count=`,  this.headers );
  }

  deleteById(Id) {
    return this.http.post<CustomResult>(`${this.getRootUrl}${this.getAreaAndPath}/deleteById?id=${Id}`,  this.headers );
  }
}
