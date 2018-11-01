import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import {TablesService} from "./tables.service";
import {DataTableModule, DialogModule} from "primeng/primeng";
import {TableModule} from "primeng/table";
import {QueriesService} from "./queries.service";
import {QueriesComponent} from "./queries/queries.component";
import {JDynamicTableComponent} from "./dynamic-table/dynamic-table.component";

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    DialogModule,TableModule
  ],
  declarations: [TablesComponent, QueriesComponent,JDynamicTableComponent],
  exports:[TablesComponent,QueriesComponent]
})
export class DatabaseModule { }
