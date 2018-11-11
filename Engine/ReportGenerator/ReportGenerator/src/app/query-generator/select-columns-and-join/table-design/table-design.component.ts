import {Component, Input, OnInit} from '@angular/core';
import {DataComponent} from "../../data/data.component";
import {BaseEntity, Model, Property, PropertyModel, QueryModel} from "../../../model/model";

declare var $: any;

@Component({
  selector: 'app-table-design',
  templateUrl: './table-design.component.html',
  styleUrls: ['./table-design.component.css'],
  moduleId: 'TableDesignComponent'
})
export class TableDesignComponent implements OnInit {
  rightJoinTable: QueryModel;
  rightJoinProperty: PropertyModel;
  leftJoinTable: QueryModel;
  leftJoinProperty: PropertyModel;


  /// اسفتاده در جوین
  relements: any[];
  lelements: any[];

  @Input()
  panelHeight;

  constructor(public DataComponent: DataComponent) {
    this.DataComponent.tableDesign_active = this;
  }

  ngOnInit() {
  }

  makeJoin(left, right) {

    if (left && right) {
      var join = new JoinTable();

      if (!this.rightJoinTable.LeftJoinTables) {

        this.rightJoinTable.RightJoinTables = [];
        this.rightJoinTable.LeftJoinTables = [];
      }
      if (!this.leftJoinTable.RightJoinTables) {
        this.leftJoinTable.RightJoinTables = [];
        this.leftJoinTable.LeftJoinTables = [];
      }


      join.rightTable = cloneAll(this.rightJoinTable);
      join.rightTableUniqId = this.rightJoinTable.uniqId;
      join.leftTableUniqId = this.leftJoinTable.uniqId;
      join.leftTable = cloneAll(this.leftJoinTable);

      join.rightProperty = cloneAll(this.rightJoinProperty);
      join.leftProperty = cloneAll(this.leftJoinProperty);

      join.relement = this.relements.pop();
      join.lelement = this.lelements.pop();

      var finded = this.DataComponent.joinTables.find(j => j.leftTable == join.leftTable
        && j.rightTable == join.rightTable &&
        j.leftProperty == join.leftProperty &&
        j.rightProperty == join.rightProperty);
      if (!finded) {


       join.leftTable.LeftJoinTables.push(join);


        join.rightTable.RightJoinTables.push(join);

        join.joinType = JoinTableType.Join;

        this.DataComponent.joinTables.push(join);

        this.onMoving(null);
        this.leftJoinTable = null;
        this.rightJoinTable = null;
        this.rightJoinProperty = null;
        this.leftJoinProperty = null;


      }
    }
  }

  rightJoin(table: number, property: number, rightRadio: HTMLInputElement) {
    this.relements = [];
    this.relements.push(rightRadio);
    this.getTableAndProperty
    ('rightJoinTable', 'rightJoinProperty',
      table, property, rightRadio);

    this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
  }


  getTableAndProperty(WhichTable, whichproperty, table: number,
                      property: number,
                      lefttRadio: HTMLInputElement) {
    this[WhichTable] = this.DataComponent.models[table];


    const prop = new PropertyModel();
    prop.Property = this.DataComponent.models[table].Model.Properties[property]
    this[whichproperty] = prop;


    //  this[WhichTable][whichElement] = lefttRadio;
    //  let rect:any = lefttRadio.getBoundingClientRect();
    /*    this[whichproperty].X = window.scrollX+parseInt( rect.left.toString())+20;
     this[whichproperty].Y =window.scrollY+ parseInt(rect.top.toString()) -30;;
     */

    console.log('left', $(lefttRadio).offset().left);
    console.log('top', $(lefttRadio).offset().top);

    /* this[whichproperty].X = $(lefttRadio).offset().left;
      this[whichproperty].Y =$(lefttRadio).offset().top;
  *!/*/
  }

  leftJoin(table: number, property: number, lefttRadio: HTMLInputElement) {

    this.lelements = [];
    this.lelements.push(lefttRadio);
    this.getTableAndProperty
    ('leftJoinTable', 'leftJoinProperty',
      table, property, lefttRadio);
    this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
  }

  selectColumn(property: Property) {

    var index = this.DataComponent.selectedProperties.findIndex
    (s => s.Property.uniqId==property.uniqId);
    if (index != -1) {
      this.DataComponent.selectedProperties[index].onOutPut = false;
      property.onOutPut = false;
      this.DataComponent.selectedProperties.splice(index, 1);
    }
    else {
      var propertyModel = new PropertyModel();
      propertyModel.Property = property;
      propertyModel.PropertyId = property.Id;
      propertyModel.onOutPut = true;
      property.onOutPut = true;

      // یعنی پروپرتی استفاده شده است
      property.uniqId=Utility.generateNewIdNumber();

      TableDesignComponent.makeSureUniqIdIsDistinct(this.DataComponent.selectedProperties,'uniqId',propertyModel);
      this.DataComponent.selectedProperties.push(propertyModel);
    }
  }



  getPossiionX(element: HTMLInputElement) {
    let rect: any = element.getBoundingClientRect();
    var X = window.scrollX + parseInt(rect.left.toString()) + 3;

    return X;
//    return $(element).offset().left;
  }

  getElementFromDom() {

  }

  onMoving(event) {
    for (var i = 0; i < this.DataComponent.joinTables.length; i++) {

      /*  if(!this.DataComponent.joinTables[i].leftTable.element){
          this.DataComponent.joinTables[i].leftTable.element=this.getElementFromDom(this.DataComponent.joinTables[i].leftTable.element);
        }*/
      this.DataComponent.joinTables[i].lelementY = this.getPossiionY(this.DataComponent.joinTables[i].lelement);
      this.DataComponent.joinTables[i].lelementX = this.getPossiionX(this.DataComponent.joinTables[i].lelement);

      this.DataComponent.joinTables[i].relementY = this.getPossiionY(this.DataComponent.joinTables[i].relement);
      this.DataComponent.joinTables[i].relementX = this.getPossiionX(this.DataComponent.joinTables[i].relement);
    }
  }

  getPossiionY(element: HTMLInputElement) {
    let rect: any = element.getBoundingClientRect();
    var Y = window.scrollY + parseInt(rect.top.toString()) - 150;

    return Y;
    //return $(element).offset().top;
  }

  selectMainTable(table: QueryModel) {
    this.DataComponent.mainTable = table;
    this.DataComponent.models.forEach(m=>m.IsMainTable=false);
    table.IsMainTable=true;
    // this.DataComponent.mainTable.isMainTable=true;
  }

  toggleAllProperties(table: Model) {
    console.log(table);
    for (let i = 0; i < table.Properties.length; i++) {
      this.selectColumn(table.Properties[i]);
    }
  }

  static makeSureUniqIdIsDistinct(selectedProperties: any[], uniqId: string, propertyModel: any) {

    if(!propertyModel[uniqId]){
      propertyModel[uniqId]=  Utility.generateNewIdNumber();
    }
    var any=selectedProperties.find(s=>s[uniqId]==propertyModel[uniqId]);
    if(any){
      propertyModel[uniqId]=null;
      return this.makeSureUniqIdIsDistinct( propertyModel[uniqId],uniqId,propertyModel);
    }
    return  propertyModel[uniqId];

  }

}


export class JoinTable extends BaseEntity{
  leftTable: QueryModel;
  rightTable: QueryModel;
  rightProperty: PropertyModel;
  leftProperty: PropertyModel;
  joinType: JoinTableType;

  rightTableId: number;
  leftTableId: number;
  rightPropertyId: number;
  leftPropertyId: number;


  lelementX: number;
  lelementY: number;
  lelement: HTMLInputElement;

  relementX: number;
  relementY: number;
  relement: HTMLInputElement;
  rightTableUniqId: number;
  leftTableUniqId: number;


  uniqId=Utility.generateNewIdNumber();
}

export enum JoinTableType {
  InnerJoin,
  LeftJoin,
  Rightjoin,
  Join,
  OuterInnerJoin,
  OuterLeftJoin,
  OuterRightjoin,
  OuterJoin,
}

import {Pipe, PipeTransform} from '@angular/core';
import {analyzeFileForInjectables} from "@angular/compiler";
import {cloneAll, Utility} from "../../utility";

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'HoldValue'})
export class HoldValuePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

