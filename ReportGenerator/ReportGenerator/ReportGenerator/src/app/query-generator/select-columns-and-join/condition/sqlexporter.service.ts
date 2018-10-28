import {Injectable} from '@angular/core';
import {
  BetweenButtonType,
  ComputeButton,
  ComputedButtonType,
  ConstButtonType,
  InputButtonType,
  SelectButtonType
} from "../../../compute-design/models";

@Injectable({
  providedIn: 'root'
})
export class SQLExporterService {

  export(computeButtonsInDesign: ComputeButton[]) {
    if (!computeButtonsInDesign) {
      console.error('computeButtonsInDesign is null');
    }
    var sql = '';

    for (let i = 0; i < computeButtonsInDesign.length; i++) {
      sql += ' ';
      switch (computeButtonsInDesign[i]['type']) {
        case SelectButtonType.one:
        case SelectButtonType.many:
        case SelectButtonType.multi:
          sql += computeButtonsInDesign[i].value;
          break;
        case (InputButtonType.number):
          sql += computeButtonsInDesign[i].value;
          break;
        case (InputButtonType.text):
          sql += `N'${computeButtonsInDesign[i].value}'`;
          break;
        case BetweenButtonType.And :
        case BetweenButtonType.Or :
        case BetweenButtonType.end :
        case BetweenButtonType.start:
          sql += computeButtonsInDesign[i].name;
          break;
        case (ConstButtonType.notNull):
          sql += computeButtonsInDesign[i].name;
          break;
        default:
          sql += computeButtonsInDesign[i].name;

      }
    }
    return sql;
  }
}
