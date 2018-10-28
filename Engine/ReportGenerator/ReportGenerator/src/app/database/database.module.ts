import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import {TablesService} from "./tables.service";
import {DataTableModule, DialogModule} from "primeng/primeng";
import {TableModule} from "primeng/table";
import {JDynamicTableModule} from "../dynamic-table/dynamic-table.module";
import {QueriesService} from "./queries.service";
import {QueriesComponent} from "./queries/queries.component";

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,TableModule,JDynamicTableModule
  ],
  declarations: [TablesComponent, QueriesComponent],
  exports:[TablesComponent,QueriesComponent]
})
export class DatabaseModule { }
