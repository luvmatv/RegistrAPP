import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RasistenciaPage } from './rasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RasistenciaPageRoutingModule {}
