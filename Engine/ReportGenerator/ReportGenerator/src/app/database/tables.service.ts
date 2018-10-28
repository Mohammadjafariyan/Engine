import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Model} from "../model/model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablesService {

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



  getAllNames(searchTerm?, lastIndex?,  count?):Observable<Model[]>{

    return this.http.get<Model[]>(`${this.getRootUrl}${this.getAreaAndPath}/GetAllNames`,  this.headers
    );
  }
}
