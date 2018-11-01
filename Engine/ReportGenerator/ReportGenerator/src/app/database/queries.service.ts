import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Model, Query} from "../model/model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
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



  getAllQueries(searchTerm?, lastIndex?,  count?):Observable<Query[]>{
    return of(null);
/*
    return this.http.get<Model[]>(`${this.getRootUrl}${this.getAreaAndPath}/GetAllQueries`,  this.headers
    );*/
  }
}
