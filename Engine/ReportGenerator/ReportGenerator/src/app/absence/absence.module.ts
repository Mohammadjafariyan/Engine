import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceIndexComponent } from './absence-index/absence-index.component';
import {AbsenceRoutingModule} from "./abscence-routing.module";
import {RouterModule} from "@angular/router";
import {FormGeneratorModule} from "../form-generator/form-generator.module";
import {DialogModule} from "primeng/dialog";
import {CalendarModule, MultiSelectModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AbsenceRoutingModule,
    RouterModule,
    FormGeneratorModule, DialogModule,
    CalendarModule,
    FormsModule, MultiSelectModule
  ],
  declarations: [AbsenceIndexComponent],
  bootstrap:[AbsenceIndexComponent],
})
export class AbsenceModule { }
