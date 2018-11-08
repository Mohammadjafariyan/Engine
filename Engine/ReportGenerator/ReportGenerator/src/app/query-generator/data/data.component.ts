import {Component, OnInit} from '@angular/core';
import {SQLServerSchemaProviderComponent} from "../db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component";
import {Model, PanelQueryType, Property, PropertyModel, Query, QueryModel, QueryType} from "../../model/model";
import {DbSchemaProviderComponent} from "../db-schema-provider/db-schema-provider.component";
import {
  JoinTable,
  TableDesignComponent
} from "../select-columns-and-join/table-design/table-design.component";
import {Field} from "../../form-generator/models";
import {AddParameterForm} from "../select-columns-and-join/column-setting/column-setting.component";
import {ComputeButton} from "../../compute-design/models";
import {cloneAll, Utility} from "../utility";
import {TablesService} from "../../database/tables.service";

declare var $:any;
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [SQLServerSchemaProviderComponent, TablesService]
})
export class DataComponent implements OnInit {

  selectedProperties: PropertyModel[] = [];
  models: QueryModel[];
  mainTable: QueryModel;
  joinTables: JoinTable[] = [];
  addParameterFields: AddParameterForm[] = [];
  WhereComputeButtons: ComputeButton[];
  WhereStatement: string;
  SQL: string;
  queryName: string = Utility.generateNewId();
  currentQuery: Query;

  tableDesign_active: TableDesignComponent;

  getPropertiesOnly() {
    var arr = [];
    for (let i = 0; i < this.selectedProperties.length; i++) {
      arr.push(this.selectedProperties[i])
    }
    return arr;
  }
/*

  selectMain(models:QueryModel[],mainTable:QueryModel) {
    if (mainTable) {
      models.forEach(m => m.IsMainTable = false);
      models.find(m => m.Id == mainTable.Id).IsMainTable = true;
    }
      }

*/


  saveQuery() {
    if (!this.mainTable) {
      alert('جدول اصلی انتخاب نشده است');
      return;
    }
    var m = new Query();

    if (this.currentQuery) {
      m.Id = this.currentQuery.Id;
    }

    m.models=[];
    for (let i = 0; i <this.models.length; i++) {
      const j=cloneAll(this.models[i]);
      j.ModelId=this.models[i].Model.Id;
      j.Model=null;
      j.QueryId=0;
      m.models.push(j);
    }

    m.selectedProperties=[];
    for (let i = 0; i <this.selectedProperties.length; i++) {
      const j=cloneAll(this.selectedProperties[i]);
      j.PropertyId=this.selectedProperties[i].Property.Id;
      j.Property=null;
      m.selectedProperties.push(j);
    }

 //   this.selectMain(m.models,this.mainTable);
    for (let i = 0; i < m.models.length; i++) {
      const j: QueryModel =m.models[i];
      for (let k = 0; k < j.LeftJoinTables.length; k++) {
        j.LeftJoinTables[k].leftTable=null;
        j.LeftJoinTables[k].rightTable=null;

        j.LeftJoinTables[k].rightProperty.QueryId=0;
        j.LeftJoinTables[k].rightProperty.Id=0;

        j.LeftJoinTables[k].leftProperty.QueryId=0;
        j.LeftJoinTables[k].leftProperty.Id=0;
      }
      for (let k = 0; k < j.RightJoinTables.length; k++) {
        j.RightJoinTables[k].leftTable=null;
        j.RightJoinTables[k].rightTable=null;

        j.RightJoinTables[k].rightProperty.QueryId=0;
        j.RightJoinTables[k].rightProperty.Id=0;

        j.RightJoinTables[k].leftProperty.QueryId=0;
        j.RightJoinTables[k].leftProperty.Id=0;
      }
      m.models[i]=(j);
    }
    //m.joinTables=this.joinTables;

    m.addParameterFields = this.addParameterFields;
    m.WhereStatement = this.WhereStatement;
    m.SQL = this.SQL;
    m.queryName = this.queryName;
    this.currentQuery = m;
    this.DataService.saveQuery(m).toPromise().then(res => {
      //this.models = res;
      this.currentQuery.Id = res.result;
      alert(res.Message);
    });
  }

  loadQuery(id: number) {
    this.DataService.loadQuery(id).toPromise().then(result => {
      var res = result.result;
      this.currentQuery = res;
      this.mainTable = res.models.find(m => m.IsMainTable);
      this.models = res.models;
      // this.selectMain();

      const asyncesHolder = [];
      let modelCounter = 0;
      this.models = this.models ? this.models : [];
      for (let i = 0; i < this.models.length; i++) {

        /* if (this.models[i].Id == this.mainTable.Id) {
           this.models[i].Model.isMainTable = true;
           document.getElementById('t'+this.mainTable.Id).click();
         }*/

        this.tableService.GetWithProperties(this.models[i].ModelId).toPromise().then(r => {

          modelCounter++;
          this.models[i].Model = r.result;
         // this.models[i].Model.Properties = r.result.properties;
          this.models[i].Model.AsName = this.models[i].Model.Name;
          //  this.models[i].Model.JoinTables = [];

          this.selectedProperties = this.selectedProperties ? this.selectedProperties : [];
          for (let j = 0; j < this.selectedProperties.length; j++) {

            let id = this.selectedProperties[j].Property.Id;

            let exist = this.models[i].Model.Properties.find(p => p.Id == id);
            if (exist) {
              this.selectedProperties[j].onOutPut = true;
              this.selectedProperties[j].Property.onOutPut = true;
              exist.onOutPut = true;
            }
          }


          if (modelCounter == this.models.length - 1) {

            setTimeout(() => {
              this.joinTables = [];


              if (res.models) {
                console.log(res.models);
                for (let t = 0; t < res.models.length; t++) {
                  let queryModel: QueryModel = res.models[t];
                  this.ClickHelp(queryModel.LeftJoinTables);
                  this.ClickHelp(queryModel.RightJoinTables);
                }
                this.tableDesign_active.onMoving(null);

              }
              document.getElementById('t' + this.mainTable.uniqId).click();


            }, 1000);


          }

        });

      }

      this.selectedProperties = res.selectedProperties;
      this.selectedProperties = this.selectedProperties ? this.selectedProperties : [];

      this.addParameterFields = res.addParameterFields;
      this.WhereStatement = res.WhereStatement;
      this.SQL = res.SQL;
      this.queryName = res.queryName;
    });
  }

  constructor(public DataService: SQLServerSchemaProviderComponent,
              public  tableService: TablesService) {

  }

  init() {
    this.DataService.getAllDemoTableNames().toPromise().then(res => {
      this.models = res;
    });
  }


  ngOnInit() {

  }

  findModel(rightProperty: PropertyModel) {
    var m = this.models.find(m => m.Model.Id == rightProperty.Property.ModelId);
    if (!m) {
      console.error('m is null');
    }
    return m;
  }

  findModelName(rightProperty: PropertyModel) {
    var m = this.findModel(rightProperty);
    return m.Model.Name;
  }

  private clickSelect(rc, lc) {

    if (rc) {
      rc.click();
    }
    if (lc) {
      lc.click();
    }
  }

  private ClickHelp(JoinTables: JoinTable[]) {
    for (let pl = 0; pl < JoinTables.length; pl++) {
      let jt=JoinTables[pl];

      let ll2;
      let a = '#pt' + jt.leftTableUniqId;
      let b = '#l' + jt.leftProperty.Property.Id;
      //ll2 = document.querySelector(a).querySelector(b);
      ll2=$(a).find(b);
      jt.lelement=ll2[0];

      let a2 = '#pt' + jt.rightTableUniqId;
      let b2 = '#r' + jt.rightProperty.Property.Id;
      let rr2 ;
      rr2=$(a2).find(b2);
//      rr2= document.querySelector(a2).querySelector(b2);
      /*if (JoinTables[t].rightTableId)
        rr2= document.querySelector('#pt' + JoinTables[t].rightTableId).
        querySelector(' #r' + JoinTables[t].rightProperty.Property.Id);*/
      jt.relement=rr2[0];

    /*  console.log(jt.rightTableUniqId,jt.leftTableUniqId);
      console.log(ll2,rr2);
      console.log('-----------------------------------');
*/
      this.joinTables.push(jt);
    //  this.clickSelect(ll2, rr2);
    }

  }
}
