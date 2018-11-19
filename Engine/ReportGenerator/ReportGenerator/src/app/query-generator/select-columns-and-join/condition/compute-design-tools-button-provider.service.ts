import {Injectable} from '@angular/core';
import {
  BetweenButton,
  BetweenButtonType,
  ComputeButton,
  ComputedButton,
  ComputedButtonType, ComputePossibleValue, ConstButton,
  ConstButtonType,
  InputButton,
  InputButtonType,
  SelectButton,
  SelectButtonType
} from "../../../compute-design/models";
import {DataComponent} from "../../data/data.component";
import {SqlQueryGeneratorComponent} from "../../query-generator/sql-query-generator/sql-query-generator.component";

@Injectable({
  providedIn: 'root'
})
export class ComputeDesignToolsButtonProviderService {

  constructor(public DataComponent: DataComponent) {
  }

  getaddParameterFields() {
    var arr: ComputePossibleValue[] = [];
    for (let i = 0; i < this.DataComponent.addParameterFields.length; i++) {

      var o = {
        name: this.DataComponent.addParameterFields[i].nameInSQL,
        value: '@' +this.DataComponent.addParameterFields[i].nameInSQL,
        obj: this.DataComponent.addParameterFields[i]
      }
      arr.push(o);
    }
    return arr;
  }

  getWhereDesignTools() {
    let buttons: ComputeButton[] = [];
    buttons.push(this.select('پارامتر ورودی', SelectButtonType.one
      , this.getaddParameterFields(), () => this.getaddParameterFields()));

    buttons.push(this.select('ستون ', SelectButtonType.many
      , this.getSelectedProperties(), () => this.getSelectedProperties()));

    /* buttons.push(this.select('تک ستون ', SelectButtonType.many
       , this.getaddParameterFields(), () => this.getaddParameterFields()));
 */
    buttons.push(this.select('شرط', SelectButtonType.one,
      this.getConditionTypes(), () => {
        return this.getConditionTypes()
      }));
    buttons.push(this.select('Clauses', SelectButtonType.one,
      this.getClauses(), () => {
        return this.getClauses()
      }));

    buttons.push(this.select('محاسباتی', SelectButtonType.one,
      this.getMathOperations(), () => {
        return this.getMathOperations()
      }));


    buttons.push(this.between('And', BetweenButtonType.And));
    buttons.push(this.between('Or', BetweenButtonType.Or));
    buttons.push(this.input('مقدار دستی', InputButtonType.text));
    buttons.push(this.input('مقدار عددی', InputButtonType.number));
    buttons.push(this.between('(', BetweenButtonType.start));
    buttons.push(this.between(')', BetweenButtonType.end));
    buttons.push(this.const('IS NULL', ConstButtonType.notNull));


    return buttons;
  }

  select(name, type: SelectButtonType, possibleValues, fillContent?) {
    let button = new SelectButton();
    button.name = name;
    button.type = type;
    button.possibleValue = possibleValues;
    button.fillContent = fillContent;
    return button;
  }

  between(name, type: BetweenButtonType) {
    let button = new BetweenButton();
    button.name = name;
    button.type = type;
    return button;
  }

  const(name, type: ConstButtonType) {
    let button = new ConstButton();
    button.name = name;
    button.type = type;
    button.value = name;
    return button;
  }

  computed(name, type: ComputedButtonType) {
    let button = new ComputedButton();
    button.name = name;
    button.type = type;
    return button;
  }

  input(name, type: InputButtonType) {
    let button = new InputButton();
    button.name = name;
    button.type = type;
    return button;
  }

  getConditionTypes() {
    let types = [
      {name: '=', value: '='},
      {name: '=>', value: '=>'},
      {name: '<=', value: '<='},
      {name: '>', value: '>'},
      {name: '<', value: '<'},
      {name: '!', value: '!'},
      {name: 'like', value: 'like'},
      {name: 'not like', value: 'not like'},
    ]
    return types;
  }

  getClauses() {
    let types = [
      {name: 'max', value: '='},
      {name: 'min', value: '=>'}
    ]
    return types;
  }


  getMathOperations() {
    let types = [
      {name: '*', value: '*'},
      {name: '+', value: '+'},
      {name: '-', value: '-'},
      {name: '/', value: '/'},
    ]
    return types;
  }

  getSelectedProperties() {
    var arr: ComputePossibleValue[] = [];
    for (let i = 0; i < this.DataComponent.selectedProperties.length; i++) {
  /*    var asName = SqlQueryGeneratorComponent.GetAsName(
        this.DataComponent.selectedProperties[i].NameInTable, SqlQueryGeneratorComponent.outputAsNames, this.DataComponent.selectedProperties[i]);
     */ var asName = this.DataComponent.selectedProperties[i].NameInTableAsName
      const tmpName=`${this.DataComponent.findModel(this.DataComponent.selectedProperties[i]).Model.TableName}.${asName}`
      var o = {
        name: tmpName,
        value: tmpName,
        obj: this.DataComponent.selectedProperties[i]
      }
      arr.push(o);
    }
    return arr;
  }
}
