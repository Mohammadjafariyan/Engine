import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QueryAppComponent} from "../query-generator/query-app/query-app.component";
import {AbsenceIndexComponent} from "./absence-index/absence-index.component";

const routes: Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:AbsenceIndexComponent},
  {path:'index/:id',component:AbsenceIndexComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AbsenceRoutingModule {
}
