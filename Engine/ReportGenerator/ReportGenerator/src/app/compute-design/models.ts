export class ComputeButton {
  name;
  position = {x: 0, y: 0};
value;
  isSelected: boolean=false;
  order: number;
}
/*TYPES */
export enum BetweenButtonType{
  And=1,Or=14,
  start=2,end=3
}

export enum ConstButtonType {
  notNull=4
}
export enum ComputedButtonType {
  min=7, max=6, convert=5
}

/*many: از کوئری یا تمامی مقادیر یک ستون را مقایسه می کند
* one : تنها یکی از مقادیر ستون را انتخاب می کند
* multi : چند مقدار را مقایسه می کند*/
export enum SelectButtonType {
  one=8, many=9,multi=12
}

export enum InputButtonType {
  text=10, number=11
}

/*TYPES END*/

export class BetweenButton extends ComputeButton {
  inside: ComputeButton[];
  type:BetweenButtonType;
}

export class ComputePossibleValue {
  name;
  value;
  obj;
}

export class ConstButton extends ComputeButton {
  type: ConstButtonType;
}
export class ComputedButton extends ComputeButton {
  type: ComputedButtonType;
  value;
}

export class InputButton extends ComputeButton {
  type: InputButtonType;
  value;
}

export class SelectButton extends ComputeButton {
  type: SelectButtonType;
  value;
  possibleValue: ComputePossibleValue[];
  fillContent;
}

