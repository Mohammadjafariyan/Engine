import {Observable} from "rxjs";
import {Model, QueryModel} from "../../model/model";

export interface IDbSchemaProviderComponent {

  getAllTableNames(): Observable<QueryModel[]>;
  getAllDemoTableNames(): Observable<QueryModel[]>;

}
