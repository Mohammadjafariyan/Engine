import {FieldType} from "../model/model";

export class Field {
  type: FieldType;
  name;
  translate;
  value?;
  possibleValues?: PossibleValue[];
  required?: boolean;
  readonly?: boolean;

}

export class PossibleValue {
  name;
  value;
}

import "reflect-metadata";


const InputFieldNameKey = Symbol('InputFieldName');

export function InputField( name: string, translate: string, type: FieldType,
                           possibleValues?: PossibleValue[]) {
  var field = new Field();
  field.name = name;
  field.possibleValues = possibleValues;
  field.type = type;
  field.translate = translate;
  return Reflect.metadata(InputFieldNameKey, field);
}

export function GetInputField(target: any, propertyKey: string) {
  return Reflect.getMetadata(InputFieldNameKey, target, propertyKey);
}


/*فیلد های داینامیک فرم را به مقادیر ابجکت می دهد*/
export function mapFormInputValues(target: any, Fields: Field[]) {
  for (let i = 0; i < Fields.length; i++) {
    target[Fields[i].name] = Fields[i].value;
  }
  return target;
}

/*GENERATE FORM INPUTS FROM DECORATORS*/
export function generateDynamicFormFields(target: any) {
  var arr = [];
  const keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    var decorator = GetInputField(target, keys[i]);
    if (!decorator) {
      console.error('!decorator')
      continue;
    }
    if (!(decorator instanceof Field)) {
      console.error('!(decorator instanceof Field)')
      continue;
    }
    var field = decorator as Field;

    arr.push(field);
  }
  return arr;
}
