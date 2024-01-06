import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceIndexComponent } from './absence-index/absence-index.component';
import {AbsenceRoutingModule} from "./abscence-routing.module";
import {RouterModule} from "@angular/router";
import {FormGeneratorModule} from "../form-generator/form-generator.module";
import {DialogModule} from "primeng/dialog";
import {CalendarModule, InputTextModule, ListboxModule, MultiSelectModule} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { CrudComponent } from './crud/crud.component';
import { OneWorkPlaceManyPersonnelComponent } from './one-work-place-many-personnel/one-work-place-many-personnel.component';
import { RelatedEntitiesComponent } from './related-entities/related-entities.component';
import { OnePersonnelManyWorkplacesComponent } from './one-personnel-many-workplaces/one-personnel-many-workplaces.component';

@NgModule({
    imports: [
        CommonModule,
        AbsenceRoutingModule,
        RouterModule,
        FormGeneratorModule, DialogModule,
        CalendarModule,
        FormsModule, MultiSelectModule, TableModule, InputTextModule, ReactiveFormsModule, ListboxModule
    ],
  declarations: [AbsenceIndexComponent, WorkplacesComponent, CrudComponent, OneWorkPlaceManyPersonnelComponent, RelatedEntitiesComponent, OnePersonnelManyWorkplacesComponent],
  bootstrap:[AbsenceIndexComponent],
})
export class AbsenceModule { }
