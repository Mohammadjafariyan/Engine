import {Component, Input, OnInit} from '@angular/core';
import {DataComponent} from "../../data/data.component";
import {Model, Property, PropertyModel} from "../../../model/model";

declare var $: any;

@Component({
  selector: 'app-table-design',
  templateUrl: './table-design.component.html',
  styleUrls: ['./table-design.component.css'],
  moduleId: 'TableDesignComponent'
})
export class TableDesignComponent implements OnInit {
  rightJoinTable: Model;
  rightJoinProperty: Property;
  leftJoinTable: Model;
  leftJoinProperty: Property;


  @Input()
  panelHeight;

  constructor(public DataComponent: DataComponent) {
  }

  ngOnInit() {
  }

  makeJoin(left, right) {

    if (left && right) {
      var join = new JoinTable();

      if(!this.rightJoinTable.JoinTables){
        this.rightJoinTable.JoinTables=[];
      }
      if(!this.leftJoinTable.JoinTables){
        this.leftJoinTable.JoinTables=[];
      }

      join.rightTable = cloneAll(this.rightJoinTable);
      join.leftTable = cloneAll(this.leftJoinTable);

      join.rightProperty = cloneAll(this.rightJoinProperty);
      join.leftProperty = cloneAll(this.leftJoinProperty);

      var finded = this.DataComponent.joinTables.find(j => j.leftTable == join.leftTable
        && j.rightTable == join.rightTable &&
        j.leftProperty == join.leftProperty &&
        j.rightProperty == join.rightProperty);
      if (!finded) {


        join.leftTable.JoinTables.push(join);
        join.rightTable.JoinTables.push(join);

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
    console.log($(rightRadio).offset());
    this.getTableAndProperty
    ('rightJoinTable', 'rightJoinProperty',
      table, property, rightRadio);

    this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
  }


  getTableAndProperty(WhichTable, whichproperty, table: number, property: number, lefttRadio: HTMLInputElement) {
    this[WhichTable] = this.DataComponent.models[table].Model;
    this[whichproperty] = this.DataComponent.models[table].Model.Properties[property];


    this[WhichTable].element = lefttRadio;
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

    this.getTableAndProperty
    ('leftJoinTable', 'leftJoinProperty',
      table, property, lefttRadio);
    this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
  }

  selectColumn(property: Property) {

    var index = this.DataComponent.selectedProperties.findIndex
    (s => s.Property == property);
    if (index != -1) {
      this.DataComponent.selectedProperties[index].Property.onOutPut = false;
      this.DataComponent.selectedProperties.splice(index, 1);
    }
    else {
      property.onOutPut = true;
      var propertyModel = new PropertyModel();
      propertyModel.Property = property;
      propertyModel.PropertyId = property.Id;

      this.DataComponent.selectedProperties.push(propertyModel);
    }
  }

  getPossiionX(element: HTMLInputElement) {
    let rect: any = element.getBoundingClientRect();
    var X = window.scrollX + parseInt(rect.left.toString()) + 3;

    return X;
//    return $(element).offset().left;
  }

  onMoving(event) {
    for (var i = 0; i < this.DataComponent.joinTables.length; i++) {
      this.DataComponent.joinTables[i].leftTable.elementY = this.getPossiionY(this.DataComponent.joinTables[i].leftTable.element);
      this.DataComponent.joinTables[i].leftTable.elementX = this.getPossiionX(this.DataComponent.joinTables[i].leftTable.element);


      this.DataComponent.joinTables[i].rightTable.elementY = this.getPossiionY(this.DataComponent.joinTables[i].rightTable.element);
      this.DataComponent.joinTables[i].rightTable.elementX = this.getPossiionX(this.DataComponent.joinTables[i].rightTable.element);
    }
  }

  getPossiionY(element: HTMLInputElement) {
    let rect: any = element.getBoundingClientRect();
    var Y = window.scrollY + parseInt(rect.top.toString()) - 150;

    return Y;
    //return $(element).offset().top;
  }

  selectMainTable(table) {
    this.DataComponent.mainTable = table;
  }

  toggleAllProperties(table: Model) {
    console.log(table);
    for (let i = 0; i < table.Properties.length; i++) {
      this.selectColumn(table.Properties[i]);
    }
  }
}


export class JoinTable {
  leftTable: Model;
  rightTable: Model;
  rightProperty: Property;
  leftProperty: Property;
  joinType: JoinTableType;

   rightTableId:number ;
 leftTableId :number;
 rightPropertyId:number;
 leftPropertyId :number;
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


function cloneAll(obj) {
  /*  let newObj = JSON.parse(JSON.stringify(obj));
    console.log(obj, newObj);*/
  var clone = Object.create(Object.getPrototypeOf(obj));

  var props = Object.getOwnPropertyNames(obj);
  props.forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(clone, key, desc);
  });

  return clone;
}
