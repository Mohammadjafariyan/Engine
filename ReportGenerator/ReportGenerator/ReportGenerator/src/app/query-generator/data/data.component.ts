import {Component, OnInit} from '@angular/core';
import {SQLServerSchemaProviderComponent} from "../db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component";
import {Model, PanelQueryType, Property, PropertyModel, Query, QueryModel, QueryType} from "../../model/model";
import {DbSchemaProviderComponent} from "../db-schema-provider/db-schema-provider.component";
import {JoinTable} from "../select-columns-and-join/table-design/table-design.component";
import {Field} from "../../form-generator/models";
import {AddParameterForm} from "../select-columns-and-join/column-setting/column-setting.component";
import {ComputeButton} from "../../compute-design/models";
import {Utility} from "../utility";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [SQLServerSchemaProviderComponent]
})
export class DataComponent implements OnInit {

  selectedProperties: PropertyModel[] = [];
  models: QueryModel[];
  mainTable: Model;
  joinTables: JoinTable[] = [];
  addParameterFields: AddParameterForm[] = [];
  WhereComputeButtons: ComputeButton[];
  WhereStatement: string;
  SQL: string;
  queryName: string = Utility.generateNewId();
  currentQuery:Query;

getPropertiesOnly(){
  var arr=[];
  for (let i = 0; i < this.selectedProperties.length; i++) {
    arr.push( this.selectedProperties[i].Property)
  }
  return arr;
}
  saveQuery() {
    var m = new Query();
    m.models = this.models;
    m.selectedProperties = this.selectedProperties;
    m.mainTable = this.mainTable;
    m.joinTables = this.joinTables;
    m.addParameterFields = this.addParameterFields;
    m.WhereStatement = this.WhereStatement;
    m.SQL = this.SQL;
    m.queryName = this.queryName;
    this.DataService.saveQuery(m).toPromise().then(res => {
      this.models = res;
    });
  }

  loadQuery(id: number) {
    this.DataService.loadQuery(id).toPromise().then(res => {
      this.models = res.models;
      this.selectedProperties = res.selectedProperties;
      this.mainTable = res.mainTable;
      this.joinTables = res.joinTables;
      this.addParameterFields = res.addParameterFields;
      this.WhereStatement = res.WhereStatement;
      this.SQL = res.SQL;
      this.queryName = res.queryName;
    });
  }

  constructor(public DataService: SQLServerSchemaProviderComponent) {

  }

  init() {
    this.DataService.getAllDemoTableNames().toPromise().then(res => {
      this.models = res;
    });
  }


  ngOnInit() {

  }

  findModel(rightProperty: Property) {
    var m = this.models.find(m => m.Model.Id == rightProperty.ModelId);
    if (!m) {
      console.error('m is null');
    }
    return m;
  }

  findModelName(rightProperty: Property) {
    var m = this.findModel(rightProperty);
    return m.Model.Name;
  }
}
