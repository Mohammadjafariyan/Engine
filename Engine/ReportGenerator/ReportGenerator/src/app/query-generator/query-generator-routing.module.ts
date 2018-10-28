import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueryAppComponent} from "./query-app/query-app.component";

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:QueryAppComponent},
  {path:'home/:id',component:QueryAppComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryGeneratorRoutingModule { }
