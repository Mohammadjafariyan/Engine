import {Injectable} from '@angular/core';
import {Global} from "../absence-index/absence.DataProviderService";
import {IService} from "../crud/crud.component";
import {Observable} from "rxjs";
import {ApiResult} from "./models";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkplacesService implements IService{

  constructor(private http: HttpClient) {
  }


  delete(model: any): Observable<ApiResult<any>> {
    var url =`/Mobile/Workplaces/Delete?id=${model.Id}`
    return this.http.post<ApiResult<any>>(url, model,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  get(): Observable<ApiResult<any[]>> {
    var url =`/Mobile/Workplaces/Get`
    return this.http.get<ApiResult<Workplace[]>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  save(model: any): Observable<ApiResult<any>> {
    var url =`/Mobile/Workplaces/Save`
    return this.http.post<ApiResult<any>>(url, model,
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}


export class Workplace {
  ApplicationUser;
  Gps;
  WorkplacePersonnels;
  oneDeviceEnabled;
  IsNotificationsEnabled;
  UserClockTypes;
  WorkplaceSettings;
  Locations;
  IsFaceRecognationEnabled;
  Id;
  Name;
  ApplicationUserId;
  UserClockTypesarr:any[]

}
