import {Component, OnInit} from '@angular/core';
import {DataComponent} from "../data/data.component";
import {ActivatedRoute} from "@angular/router";
import {Model, QueryModel} from "../../model/model";

@Component({
  selector: 'app-query-app',
  templateUrl: './query-app.component.html',
  styleUrls: ['./query-app.component.css'],
  moduleId: 'QueryAppComponent'
})
export class QueryAppComponent implements OnInit {
  panelHeight = 500;
  activeTab = 1;


  showTables = false;
  showQueries = false;

  constructor(public DataComponent: DataComponent,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.params['id'];
    debugger;
    if (id) {
      //UPDATE
      this.DataComponent.loadQuery(id);
    } else {
      this.DataComponent.init();
    }

  }


}
