import {Component, OnInit, ViewChild} from '@angular/core';
import {DataComponent} from "../data/data.component";
import {ActivatedRoute} from "@angular/router";
import {Model, Query, QueryModel} from "../../model/model";
import {TablesComponent} from "../../database/tables/tables.component";
import {QueriesComponent} from "../../database/queries/queries.component";

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

  @ViewChild('tables')
  tables:TablesComponent;


  @ViewChild('queries')
  queries:QueriesComponent;

  openModalTables(){
    this.showTables=true;
    if(this.tables)
    this.tables.display=true;
  }


  querySelect(ev:Query){

    this.DataComponent.loadQuery(ev.Id);

  }


  openModalQueries(){
    this.showQueries=true;
    if(this.queries)
      this.queries.display=true;
  }

  constructor(public DataComponent: DataComponent,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      //UPDATE
      this.DataComponent.loadQuery(id);
    } else {
      this.DataComponent.init();
    }

  }


}
