import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryGeneratorRoutingModule } from './query-generator-routing.module';
import { QueryAppComponent } from './query-app/query-app.component';
import { DbSchemaProviderComponent } from './db-schema-provider/db-schema-provider.component';
import { SQLServerSchemaProviderComponent } from './db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component';
import { SelectColumnsAndJoinComponent } from './select-columns-and-join/select-columns-and-join.component';
import { DesignQueryComponent } from './select-columns-and-join/design-query/design-query.component';
import {HoldValuePipe, TableDesignComponent} from './select-columns-and-join/table-design/table-design.component';
import { MenuComponent } from './select-columns-and-join/menu/menu.component';
import { ColumnSettingComponent } from './select-columns-and-join/column-setting/column-setting.component';
import { QueryGeneratorComponent } from './query-generator/query-generator.component';
import { SqlQueryGeneratorComponent } from './query-generator/sql-query-generator/sql-query-generator.component';
import { DataComponent } from './data/data.component';
import {AngularDraggableModule} from "angular2-draggable";
import {FormsModule} from "@angular/forms";
import {FormGeneratorModule} from "../form-generator/form-generator.module";
import { ConditionComponent } from './select-columns-and-join/condition/condition.component';
import {ComputeDesignModule} from "../compute-design/compute-design.module";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {DatabaseModule} from "../database/database.module";

@NgModule({
  imports: [FormGeneratorModule,FormsModule,
    CommonModule,AngularDraggableModule,
    QueryGeneratorRoutingModule,
    ComputeDesignModule,DialogModule,RouterModule,
    DatabaseModule
  ],
  declarations: [QueryAppComponent,HoldValuePipe,
    DbSchemaProviderComponent, SQLServerSchemaProviderComponent,
    SelectColumnsAndJoinComponent, DesignQueryComponent, TableDesignComponent,
    MenuComponent, ColumnSettingComponent, QueryGeneratorComponent,
    SqlQueryGeneratorComponent, DataComponent, ConditionComponent],
  bootstrap:[QueryAppComponent],
  providers:[SQLServerSchemaProviderComponent,DataComponent]
})
export class QueryGeneratorModule { }
