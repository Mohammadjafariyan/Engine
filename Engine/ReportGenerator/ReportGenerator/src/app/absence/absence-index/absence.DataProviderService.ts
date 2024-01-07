import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ObligatedRange, ObligatedRangeWeeks, System} from "./absence.models";
import DayOfWeek = System.DayOfWeek;
import {ApiResult} from "../services/models";


@Injectable()
export class AbsenceDataProviderService {


  constructor(public http:HttpClient){

  }
  getDay(name, t: DayOfWeek,WeekNumber:number) {
    let sat = new ObligatedRangeWeeks();
    sat.DayOfWeek = t;
    sat.DayOfWeekFaName = name;
    sat.WeekNumber=WeekNumber;
    return sat;
  }

  getWeek(WeekNumber:number):ObligatedRangeWeeks[] {
    var weeks = [];
    weeks.push(this.getDay( "شنبه",DayOfWeek.Saturday,WeekNumber));
    weeks.push(this.getDay( "یکشنبه",DayOfWeek.Sunday,WeekNumber));
    weeks.push(this.getDay( "دوشنبه",DayOfWeek.Monday,WeekNumber));
    weeks.push(this.getDay( "سه شنبه",DayOfWeek.Tuesday,WeekNumber));
    weeks.push(this.getDay( "چهارشنبه",DayOfWeek.Wednesday,WeekNumber));
    weeks.push(this.getDay( "پنجشنبه",DayOfWeek.Thursday,WeekNumber));
    weeks.push(this.getDay( "جمعه",DayOfWeek.Friday,WeekNumber));

    return weeks.reverse();
  }

  GetById(id: any):Observable<ApiResult<any>> {
    return this.http.get<ApiResult<any>>(`${this.getRootUrl}${this.getAreaAndPath}/getById?id=${id}`,  this.headers );
  }


  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get getRootUrl() {
    const rootUrl = window['rootUrl'];
    if (!rootUrl) {
      console.error('rootUrl is null');
    }
    return rootUrl;
  }


  get getAreaAndPath() {
    return 'absence/ObligatedRange';
  }



  Save(ObligatedRange: ObligatedRange) :Observable<ApiResult<string>>{
    return this.http.post<ApiResult<string>>
    (`${this.getRootUrl}${this.getAreaAndPath}/Save`,
      ObligatedRange,  this.headers );
  }
}



export class Global{
  static __API_URL__() {
    const rootUrl = window['rootUrl'];
    if (!rootUrl) {
      console.error('rootUrl is null');
    }
    return rootUrl;
  }
}
