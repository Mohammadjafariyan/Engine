import { Component, OnInit } from '@angular/core';
import {DbSchemaProviderComponent} from "../db-schema-provider.component";
import {Query} from "../../data/data.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sqlserver-schema-provider',
  templateUrl: './sqlserver-schema-provider.component.html',
  styleUrls: ['./sqlserver-schema-provider.component.css']
})
export class SQLServerSchemaProviderComponent extends DbSchemaProviderComponent implements OnInit {


  ngOnInit() {
  }


}
