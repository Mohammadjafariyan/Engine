import {Component, OnInit} from '@angular/core';
import {IDbSchemaProviderComponent} from "./idb-schema-provider";
import {Model, NavigationProperty, NavigationPropertyType, Property, Query, QueryModel} from "../../model/model";
import {Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JoinTable} from "../select-columns-and-join/table-design/table-design.component";
import {CustomResult, CustomResultGeneric} from "../../database/tables.service";


@Component({
  selector: 'app-db-schema-provider',
  templateUrl: './db-schema-provider.component.html',
  styleUrls: ['./db-schema-provider.component.css']
})
export class DbSchemaProviderComponent implements OnInit, IDbSchemaProviderComponent {

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(public http: HttpClient) {
  }

  get getRootUrl() {
    const rootUrl = window['rootUrl'];
    if (!rootUrl) {
      console.error('rootUrl is null');
    }
    return rootUrl;
  }


  get getAreaAndPath() {
    return 'api/query/';
  }

  ngOnInit() {
  }

  removeCircularity(query: Query) {
   /* for (let i = 0; i < query.joinTables.length; i++) {
      query.joinTables[i].leftTableId = query.joinTables[i].leftTable.Id
      query.joinTables[i].rightTableId = query.joinTables[i].rightTable.Id

      query.joinTables[i].leftPropertyId = query.joinTables[i].leftProperty.Id
      query.joinTables[i].rightPropertyId = query.joinTables[i].rightProperty.Id
    }
*/
  }


  saveQuery(query: Query): Observable<CustomResult> {
   // this.removeCircularity(query);
    console.log(query);
    /*var json = JSON.stringify(query, function (key, value) {
      if (key == 'leftTable' ||
        key == 'rightTable' ||
        key == 'leftProperty' ||
        key == 'rightProperty') {
      }
      else {
        return value;
      }
    });*/
    console.log(query);
    return this.http.post<CustomResult>
      (`${this.getRootUrl}${this.getAreaAndPath}/saveQuery`, query, this.headers
    );
  }

  loadQuery(id: number): Observable<CustomResultGeneric<Query>> {
    return this.http.get<CustomResultGeneric<Query>>(
      `${this.getRootUrl}${this.getAreaAndPath}/loadQuery?id=${id}`);
  }



  getAllQueries(id: number): Observable<Query> {
    return this.http.get<Query>(
      `${this.getRootUrl}/${this.getAreaAndPath}/loadQuery?id=${id}`);
  }


  private setBook() {


    var book = new Model();
    book.Name = "book";
    book.TableName = "book";


    var name = new Property();
    name.NameInModel = "name";
    name.NameInTable = "name";
    name.ModelId = book.Id;
    name.ModelName = 'book';

    var id = new Property();
    id.NameInModel = "id";
    id.NameInTable = "id";
    id.PK = true;
    id.ModelId = book.Id;
    id.ModelName = 'book';

//    name.=PropertyType.;


    book.Properties = [];
    book.Properties.push(name);
    book.Properties.push(id);

    return book;

  }

  private setRent() {

    var rent = new Model();
    rent.Name = "rent";
    rent.TableName = "rent";

    var id = new Property();
    id.NameInModel = "id";
    id.NameInTable = "id";
    id.PK = true;
    id.ModelId = rent.Id;
    id.ModelName = 'rent';

    rent.Properties = [];
    rent.Properties.push(id);
    return rent;
  }

  private setUser() {
    var user = new Model();
    user.Name = "user";
    user.TableName = "user";

    var name = new Property();
    name.NameInModel = "name";
    name.NameInTable = "name";
    name.ModelId = user.Id;
    name.ModelName = 'user';

    var id = new Property();
    id.NameInModel = "id";
    id.NameInTable = "id";
    id.PK = true;
    id.ModelId = user.Id;
    id.ModelName = 'user';

    var lname = new Property();
    lname.NameInModel = "lname";
    lname.NameInTable = "lname";
    lname.ModelId = user.Id;
    lname.ModelName = 'user';


//    name.=PropertyType.;


    user.Properties = [];
    user.Properties.push(name);
    user.Properties.push(lname);
    user.Properties.push(id);

    return user;
  }

  getAllTableNames(): Observable<QueryModel[]> {

    return of(null);
  }

  getAllDemoTableNames(): Observable<QueryModel[]> {
    var models = [];


    var user = this.setUser();
    var book = this.setBook();
    var rent = this.setRent();


    var Bookrents = new NavigationProperty();
    Bookrents.Name = "rents";
    Bookrents.NavigationPropertyType = NavigationPropertyType.Many;
    Bookrents.ModelId = book.Id;
    book.NavigationProperties.push(Bookrents);


    var Userrents = new NavigationProperty();
    Userrents.Name = "rents";
    Userrents.NavigationPropertyType = NavigationPropertyType.Many;
    Userrents.ModelId = user.Id;
    user.NavigationProperties.push(Userrents);


    var rentsb = new NavigationProperty();
    rentsb.Name = "book";
    rentsb.NavigationPropertyType = NavigationPropertyType.One;
    rentsb.ModelId = rent.Id;
    rent.NavigationProperties.push(rentsb);


    var rents = new NavigationProperty();
    rents.Name = "user";
    rents.NavigationPropertyType = NavigationPropertyType.One;
    rents.ModelId = rent.Id;
    rent.NavigationProperties.push(rents);

    models.push(book);
    models.push(user);
    models.push(rent);


    var quermodels = [];
    var quermodel1 = new QueryModel();
    quermodel1.Model = book;

    var quermodel2 = new QueryModel();
    quermodel2.Model = user;

    var quermodel3 = new QueryModel();
    quermodel3.Model = rent;

    quermodels.push(quermodel1);
    quermodels.push(quermodel2);
    quermodels.push(quermodel3);

    return of([]);
  }

}
