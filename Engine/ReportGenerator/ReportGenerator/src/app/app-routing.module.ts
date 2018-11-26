import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'design', pathMatch: 'full'},
  {
    path: 'design',
    loadChildren: './query-generator/query-generator.module#QueryGeneratorModule'
  },
  {
    path: 'absence',
    loadChildren: './absence/absence.module#AbsenceModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
