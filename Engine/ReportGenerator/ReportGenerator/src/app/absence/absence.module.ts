import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceIndexComponent } from './absence-index/absence-index.component';
import {AbsenceRoutingModule} from "./abscence-routing.module";
import {RouterModule} from "@angular/router";
import {DialogModule} from "primeng/dialog";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { CrudComponent } from './crud/crud.component';
import { OneWorkPlaceManyPersonnelComponent } from './one-work-place-many-personnel/one-work-place-many-personnel.component';
import { RelatedEntitiesComponent } from './related-entities/related-entities.component';
import { OnePersonnelManyWorkplacesComponent } from './one-personnel-many-workplaces/one-personnel-many-workplaces.component';
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {PickListModule} from "primeng/picklist";
import {MessagesModule} from "primeng/messages";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  imports: [
    CommonModule,
    AbsenceRoutingModule,
    RouterModule,
    DialogModule,
    CalendarModule,
    FormsModule, MultiSelectModule, TableModule, InputTextModule, ReactiveFormsModule, ListboxModule, PickListModule, ToastModule, MessagesModule, ConfirmDialogModule, InputSwitchModule
  ],
  declarations: [AbsenceIndexComponent, WorkplacesComponent, CrudComponent, OneWorkPlaceManyPersonnelComponent, RelatedEntitiesComponent, OnePersonnelManyWorkplacesComponent],
  bootstrap:[AbsenceIndexComponent],
})
export class AbsenceModule { }
