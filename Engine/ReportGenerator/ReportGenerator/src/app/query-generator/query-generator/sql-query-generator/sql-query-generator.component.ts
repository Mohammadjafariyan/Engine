import {Component, OnInit} from '@angular/core';
import {IQueryGenerator} from "../iquery-generator";
import {Model, NavigationProperty, Property} from "../../../model/model";
import {Observable, of} from "rxjs";
import {JoinTable, JoinTableType} from "../../select-columns-and-join/table-design/table-design.component";
import {AppComponent} from "../../../app.component";
import {DataComponent} from "../../data/data.component";
import {AddParameterForm} from "../../select-columns-and-join/column-setting/column-setting.component";
import {SettingDFormInputsService} from "../../select-columns-and-join/column-setting/setting-dform-inputs.service";

@Component({
  selector: 'app-sql-query-generator',
  templateUrl: './sql-query-generator.component.html',
  styleUrls: ['./sql-query-generator.component.css']
})
export class SqlQueryGeneratorComponent implements OnInit, IQueryGenerator {

  constructor(public  dataComponent: DataComponent) {
  }

  ngOnInit() {
  }

  getDefinedQueryVariable(addParameterField: AddParameterForm, typesInsql) {
    if (!addParameterField) {
      console.error('addParameterField is null');
    }
    return `DECLARE   ${addParameterField.nameInSQL} ${addParameterField.typeInSQL};  `
  }

  getDefinedQueryVariables(addParameterFields: AddParameterForm[]) {
    if (!addParameterFields) {
      console.error('addParameterFields is null');
    }
    var variables = '';
    var arr = SettingDFormInputsService.getTypesInSQL()
    for (let i = 0; i < addParameterFields.length; i++) {
      variables += this.getDefinedQueryVariable(addParameterFields[i], arr);
    }
    return variables;
  }

  Generate(properties: Property[],
           navigationProperties: NavigationProperty[],
           joinTables: JoinTable[], mainTable: Model): Observable<string> {

    if (!mainTable) {
      AppComponent.ShowMsg('', 'اشکال', 'جدول اصلی انتخاب نشده است');
      return;
    }
    if (!mainTable.TableName) {
      AppComponent.ShowMsg('', 'اشکال', 'جدول اصلی نام ندارد');
    }
    debugger;
    let variables = this.getDefinedQueryVariables(this.dataComponent.addParameterFields);
    let columns = this.GetColumns(properties, navigationProperties);
    let conditions = this.GetConditions(properties, navigationProperties);
    let joins = this.GetJoins(properties, navigationProperties, mainTable);


    columns = columns ? columns : '*';

    let select = `${variables}  
    
    select ${columns} from ${mainTable.TableName} as
     ${SqlQueryGeneratorComponent.GetAsName(mainTable.Name, SqlQueryGeneratorComponent.tableAsNames, mainTable)} `;

    if (joins) {
      select += ` ${joins}`;
    }

    if (conditions) {
      select += ` where ${conditions}`;
    }
    return of(select);
  }

  GetColumns(properties: Property[], navigationProperties: NavigationProperty[]): string {
    let columns = properties.filter(p => p.onOutPut);
    let compWithAs = this.GetAsOfColumns(columns);
    return compWithAs;
  }


  GetConditions(properties: Property[], navigationProperties: NavigationProperty[]): string {
    return this.dataComponent.WhereStatement;
  }

  GetJoins(properties: Property[],
           navigationProperties: NavigationProperty[], mainTable: Model): string {

    if (!mainTable)
      AppComponent.ShowMsg('', '', 'mainTable is null');

    let joins = '';
    for (let i = 0; i < mainTable.JoinTables.length; i++) {
      let joinTable = mainTable.JoinTables[i];

      // جداول اصلی و پروپرتی ها را مشخص کن که کدام اصلی و فرعی است
      let firstTableTmp = this.GetMainForJoin(joinTable, mainTable);
      let dependentTable = this.GetDependentTableForJoin(joinTable, firstTableTmp);


      // اگر برابر بود که هیچ در غیر اینصورت عوض کن جای آن ها را
      let firstTable;
      if (firstTableTmp == mainTable) {
        firstTable = firstTableTmp;
      } else {
        firstTable = dependentTable;
        dependentTable = firstTableTmp;
      }

      var modelName = this.dataComponent.findModelName(joinTable.rightProperty);
      let mainProperty = firstTable.Name == modelName ? joinTable.rightProperty : joinTable.leftProperty;
      let dependentProperty = dependentTable.Name == modelName ? joinTable.rightProperty : joinTable.leftProperty;

      let jointype: string = this.GetJoinType(joinTable);

      let join;
      // اگر اولی باشد جوین نزن
      join = `${jointype} ${dependentTable.TableName}
          as ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)} on 
           ${SqlQueryGeneratorComponent.GetAsName(firstTable.Name, SqlQueryGeneratorComponent.tableAsNames, firstTable)}.
           ${mainProperty.NameInTableAsName}=
           ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)}.
           ${dependentProperty.NameInTableAsName}`;

      /*     // اگر اولی باشد جوین نزن
           join = `${jointype} ${dependentTable.TableName}
               as ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)} on
                ${SqlQueryGeneratorComponent.GetAsName(firstTable.Name, SqlQueryGeneratorComponent.tableAsNames, firstTable)}.
                ${mainProperty.NameInTable}=
                ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)}.
                ${dependentProperty.NameInTable}`;*/
      /*else {
       join = `${jointype} ${firstTable.Name} as
         ${this.GetAsName(firstTable.Name, this.tableAsNames, firstTable)} on
          ${this.GetAsName(firstTable.Name, this.tableAsNames, firstTable)}.
          ${mainProperty.NameInTable}=
          ${this.GetAsName(dependentTable.Name, this.tableAsNames, dependentTable)}.
          ${dependentProperty.NameInTable}`;
     }*/

      // let joins = `inner join table2 as t on t.id=s.1`;

      joins += ' ' + join;

    }
    return joins;
  }


  private GetMainForJoin(table: JoinTable, Ftable) {
    return table.rightTable.Name == Ftable.Name ? table.leftTable : table.rightTable;
  }

  private GetDependentTableForJoin(table: JoinTable, Ftable) {
    return table.rightTable.Name == Ftable.Name ? table.leftTable : table.rightTable;
  }

  GetJoinType(table: JoinTable): string {


    switch (table.joinType) {
      case JoinTableType.InnerJoin:
        return 'inner join';
      case JoinTableType.LeftJoin:
        return 'left join';
      case JoinTableType.Rightjoin:
        return 'right join';
      case JoinTableType.Join:
        return ' join';
      case JoinTableType.OuterInnerJoin:
        return 'outer inner join';
      case JoinTableType.OuterJoin:
        return 'outer  join';
      case JoinTableType.OuterLeftJoin:
        return 'outer left join';
      case JoinTableType.OuterRightjoin:
        return 'outer  right join';

    }
    console.error('connot determine');

  }


  GetAsOfColumns(columns: Property[]): string {
    let c = 0;
    let names = '';
    for (let i = 0; i < columns.length; i++) {
      let name = `${this.dataComponent.findModel(columns[i]).Model.AsName}.
      ${columns[i].NameInTable}  
      as  
       ${columns[i].NameInTableAsName} `
      names += ' ' + name;

      // آخری نباشد
      if (columns.length - 1 != i) {
        names += ',';
      }
    }
    return names;
  }

  GetAsOfColumnsNav(columns: NavigationProperty[]): string {
    return "";
  }


  static tableAsNames: AsName[] = [];
  static outputAsNames: AsName[] = [];

  // CHECK ALL AS NAMES MUST UNIQe
  static GetAsName(Name, asNames: AsName[], obj) {
    // اگر پیدا کردی برگردان
    let exists = asNames.findIndex(f =>
      f.name == Name && f.obj == obj);

    if (exists != -1) {
    } else {
      // اگر پیدا نکردی با همان ابجکت اضافه کن
      asNames.push({name: Name, as: '_' + Name, obj: obj});
    }

    // REMOVE DUBLICATES
    for (let i = 0; i < asNames.length; i++) {
      let index = asNames.findIndex(f =>
        f.as == asNames[i].as
        && f.name == asNames[i].name
        && f.obj != asNames[i].obj
      );

      let c = 0;
      // DUBLICATE EXISTS
      if (index != -1) {
        while (true) {

          index = asNames.findIndex(f => f.as == asNames[i].as
            && f.name == asNames[i].name
            && f.obj != asNames[i].obj
          );

          // DUBLICATE AGAIN
          if (index != -1) {
            asNames[i].as = asNames[i].name + `${c++}`;
          } else {
            break;
          }
        }
      }
    }

    //  برگردان
    exists = asNames.findIndex(f =>
      f.name == Name && f.obj == obj);

    if (exists != -1) {
      return asNames[exists].as;
    } else {
      console.error('could not find');
    }
  }


}

export class AsName {
  name;
  as;
  obj;
}
