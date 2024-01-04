import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceIndexComponent } from './absence-index/absence-index.component';
import {AbsenceRoutingModule} from "./abscence-routing.module";
import {RouterModule} from "@angular/router";
import {FormGeneratorModule} from "../form-generator/form-generator.module";
import {DialogModule} from "primeng/dialog";
import {CalendarModule, InputTextModule, MultiSelectModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import { WorkplacesComponent } from './workplaces/workplaces.component';

@NgModule({
    imports: [
        CommonModule,
        AbsenceRoutingModule,
        RouterModule,
        FormGeneratorModule, DialogModule,
        CalendarModule,
        FormsModule, MultiSelectModule, TableModule, InputTextModule
    ],
  declarations: [AbsenceIndexComponent, WorkplacesComponent],
  bootstrap:[AbsenceIndexComponent],
})
export class AbsenceModule { }
