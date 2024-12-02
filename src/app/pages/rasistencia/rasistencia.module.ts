import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RasistenciaPageRoutingModule } from './rasistencia-routing.module';

import { RasistenciaPage } from './rasistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RasistenciaPageRoutingModule
  ],
  declarations: [RasistenciaPage]
})
export class RasistenciaPageModule {}
