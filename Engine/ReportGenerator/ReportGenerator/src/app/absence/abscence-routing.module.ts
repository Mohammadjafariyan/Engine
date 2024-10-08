import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AbsenceIndexComponent} from "./absence-index/absence-index.component";
import {WorkplacesComponent} from "./workplaces/workplaces.component";
import {ForgetCardsComponent} from "./forget-cards/forget-cards.component";

export const absenceroutes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:AbsenceIndexComponent},
  {path:'workplaces',component:WorkplacesComponent},
  {path:'forget-cards',component:ForgetCardsComponent},
  {path:'home/:id',component:AbsenceIndexComponent},
];


@NgModule({
  imports: [RouterModule.forChild(absenceroutes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule {
}
