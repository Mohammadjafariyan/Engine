import {Component, Input, OnInit} from '@angular/core';
import {Field} from "../models";
import {FieldType} from "../../model/model";

@Component({
  selector: 'dynamic-form-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  FieldType = FieldType;


  @Input()
  iterate=2;
  @Input()
  fields: Field[];

  @Input()
  isInline: boolean;

  getFields() {
    return this.fields;
  }


  constructor() {
  }

  ngOnInit() {

    console.log(this.fields);
    console.log(FieldType);
    console.log(FieldType.Text);
  }

}
