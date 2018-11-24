import { Component } from '@angular/core';
import {DataComponent} from "./query-generator/data/data.component";
import {CustomResultType} from "./database/tables.service";

@Component({
  moduleId:'AppComponent',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReportGenerator';

  static ShowMsg(s: string, err: CustomResultType, errmsg: string) {
    alert(errmsg);
  }
}
