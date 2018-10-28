import {Injectable} from '@angular/core';
import {Field, PossibleValue} from "../../../form-generator/models";
import {FieldType, PropertyInDatabaseType, PropertyType} from "../../../model/model";
import {Globals, Utility} from "../../utility";

@Injectable({
  providedIn: 'root'
})
export class SettingDFormInputsService {

  constructor() {
  }

  static getTypesInCode() {
    return SettingDFormInputsService.getKeyValueOfEnum(PropertyType);
  }

  static getKeyValueOfEnum(enm) {
    const keys = Object.keys(enm).filter(k => typeof enm[k as any] === "number"); // ["A", "B"]
//    const values = keys.map(k => E[k as any]);
    var arr = [];
    for (let i = 0; i < keys.length; i++) {
      var possibleValue = new PossibleValue();
      possibleValue.name = keys[i];
      possibleValue.value = keys[i];
      arr.push(possibleValue);
    }
    return arr;
  }

  static getTypesInSQL() {
    return SettingDFormInputsService.getKeyValueOfEnum(PropertyInDatabaseType);

  }
/*
  getAddParameterInputs() {
    var params: Field[] = [
      {name: 'nameInSQL', translate: 'نام در SQL', type: FieldType.Text},
      {name: 'nameInMethod', translate: 'نام در متد', type: FieldType.Text},
      {name: 'nameInComment', translate: 'نام در کامنت', type: FieldType.Text},
      {name: 'typeInModel', translate: 'نوع پارامتر', type: FieldType.DropDown, possibleValues: this.getTypesInCode()},
      {name: 'typeInSQL', translate: 'نوع در SQL', type: FieldType.DropDown, possibleValues: this.getTypesInSQL()},
      {name: Globals.uniqId, translate: Globals.uniqId, type: FieldType.Hidden, value: Utility.generateNewId()},
      {name: 'nullable', translate: 'nullable', type: FieldType.Checkbox}];
    return params;
  }*/
}
