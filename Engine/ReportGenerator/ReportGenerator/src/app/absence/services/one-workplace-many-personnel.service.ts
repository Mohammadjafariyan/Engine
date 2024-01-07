import {Injectable} from '@angular/core';
import {IRelatedModel, IRelatedService} from "../related-entities/related-entities.component";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Workplace} from "./workplaces.service";
import {ApiResult} from "./models";

@Injectable({
  providedIn: 'root'
})
export class OneWorkplaceManyPersonnelService implements IRelatedService {
  constructor(private http: HttpClient) {
  }


  delete(model: any): Observable<ApiResult<any>> {
    return undefined;
  }

  get(oneId: any): Observable<ApiResult<IRelatedModel>> {
    var url = `/Mobile/Workplaces/GetOneWorkplaceManyPersonnel?oneId=${oneId}`
    return this.http.get<ApiResult<IRelatedModel>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  save(model: any): Observable<ApiResult<any>> {
    var url = `/Mobile/Workplaces/SaveOneWorkplaceManyPersonnel`
    return this.http.post<ApiResult<IRelatedModel>>(url, model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
