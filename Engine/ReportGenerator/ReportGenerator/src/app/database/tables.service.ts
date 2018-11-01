import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Model, Property} from "../model/model";
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
    return 'api/Tables/';
  }



  getAllNames(searchTerm?, lastIndex?,  count?):Observable<CustomResultGeneric<Model[]>>{
    return this.http.get<CustomResultGeneric<Model[]>>
    (`${this.getRootUrl}${this.getAreaAndPath}/GetAllNames?SearchTerm=&lastIndex=&count=`,  this.headers
    );
  }

  GetWithProperties(Id: number) {
    return this.http.get<CustomResultGeneric<Property[]>>(`${this.getRootUrl}${this.getAreaAndPath}/GetWithProperties?Id=${Id}`,  this.headers);
  }
}


export class CustomResultGeneric<T>
{
  result:T;

  Message;
  Status:CustomResultType;
}

export class CustomResult
{
  result:any;

   Message;
Status:CustomResultType;
}

export enum CustomResultType
{
  success, fail
}

