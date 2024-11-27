import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { SolicitudesPageRoutingModule } from './solicitudes-routing.module';
import { SolicitudesPage } from './solicitudes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agregar aquí ReactiveFormsModule
    IonicModule,
    SolicitudesPageRoutingModule,
  ],
  declarations: [SolicitudesPage],
})
export class SolicitudesPageModule {}
