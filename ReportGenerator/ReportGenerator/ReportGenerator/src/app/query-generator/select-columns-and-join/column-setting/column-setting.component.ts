import {Component, OnInit} from '@angular/core';
import {DataComponent} from "../../data/data.component";
import {SettingDFormInputsService} from "./setting-dform-inputs.service";
import {Field, generateDynamicFormFields, InputField, mapFormInputValues} from "../../../form-generator/models";
import {FieldType, Property} from "../../../model/model";
import {Globals, Utility} from "../../utility";

@Component({
  moduleId: 'ColumnSettingComponent',
  selector: 'app-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.css'],
  providers: [SettingDFormInputsService]
})
export class ColumnSettingComponent implements OnInit {
  addParameterFields: Field[];
  parameterForm = new AddParameterForm();

  constructor(public DataComponent: DataComponent,
              public SettingDFormInputsService: SettingDFormInputsService) {
  }


  initAddParams() {
    debugger;
    this.addParameterFields = generateDynamicFormFields(this.parameterForm);
  }

  delete(){
    this.DataComponent.addParameterFields=
      this.DataComponent.addParameterFields.filter(a=>!a.isSelected);
  }

  ngOnInit() {
    this.initAddParams();
  }

  saveParameter() {

    debugger;
    mapFormInputValues(this.parameterForm, this.addParameterFields);

    //EDIT
    if (this.parameterForm.foredit) {
      var index = this.DataComponent.addParameterFields.findIndex(f => f.uniqId == this.parameterForm.uniqId);
      if (index == -1) {
        console.error('index is nul');
      } else {
        this.DataComponent.addParameterFields[index] = this.parameterForm;
      }
    } else {
      this.DataComponent.addParameterFields.push(this.parameterForm);
    }

  }

  edit(property: AddParameterForm) {
    property.foredit = true;
    this.addParameterFields = generateDynamicFormFields(property);
  }
}


export class AddParameterForm {

  constructor() {
    this.uniqId = Utility.generateNewId();
  }

  @InputField('nameInSQL', 'نام در SQL', FieldType.Text)
  nameInSQL = null;

  @InputField('nameInMethod', 'نام در متد', FieldType.Text)
  nameInMethod = null;

  @InputField('nameInComment', 'نام در کامنت', FieldType.Text)
  nameInComment = null;

  @InputField('typeInModel', 'نوع پارامتر ', FieldType.DropDown, SettingDFormInputsService.getTypesInCode())
  typeInModel = null;

  @InputField('typeInSQL', 'نوع در SQL', FieldType.DropDown
    , SettingDFormInputsService.getTypesInSQL())
  typeInSQL = null;
/*
  @InputField('range', 'رنج', FieldType.Text)
  range = null;

  @InputField('defaultValue', 'مقدار اولیه ثابت', FieldType.Text)
  defaultValue = null;*/


  @InputField(Globals.uniqId, Globals.uniqId, FieldType.Hidden)
  uniqId = null;

  @InputField('nullable', 'nullable', FieldType.Checkbox)
  nullable = null;

  isSelected;
  foredit;
}