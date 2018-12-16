import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AbsenceIndexComponent} from "./absence-index/absence-index.component";

export const absenceroutes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:AbsenceIndexComponent},
  {path:'home/:id',component:AbsenceIndexComponent},
];


@NgModule({
  imports: [RouterModule.forChild(absenceroutes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule {
}
