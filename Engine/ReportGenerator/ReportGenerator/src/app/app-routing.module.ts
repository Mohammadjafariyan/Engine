import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'design', pathMatch: 'full'},
  {
    path: 'absence',
    loadChildren: () => import('./absence/absence.module').then(m => m.AbsenceModule)

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
