import {Injectable} from '@angular/core';
import {ApiResult, CustomResult} from "../../database/tables.service";
import {Global} from "../absence-index/absence.DataProviderService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IService} from "../crud/crud.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkplacesService implements IService{

  constructor(private http: HttpClient) {
  }


  delete(model: any): Observable<ApiResult<any>> {
    return undefined;
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
    return this.http.post<ApiResult<Workplace[]>>(url, model,
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

}
