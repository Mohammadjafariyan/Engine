import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DataTableModule} from "primeng/primeng";
import {JDynamicTableComponent} from "./dynamic-table/dynamic-table.component";

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule
  ],
  declarations: [JDynamicTableComponent],
  exports:[JDynamicTableComponent]
})
export class JDynamicTableModule { }
