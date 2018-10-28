import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TablesComponent} from "./tables/tables.component";

const routes: Routes = [
  {path: '', redirectTo: 'tables', pathMatch: 'full'},
  {path: 'tables',  pathMatch: 'full',component:TablesComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
