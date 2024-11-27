import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      sede: ['', Validators.required],
      categoria: ['', Validators.required],
      servicio: ['', Validators.required],
      comentarios: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  enviarSolicitud() {
    if (this.solicitudForm.valid) {
      const solicitudData = {
        ...this.solicitudForm.value,
        nombreUsuario: localStorage.getItem('nombreUsuario') || 'Anónimo', 
      };

      
      const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes') || '[]');

      
      solicitudesGuardadas.push(solicitudData);

      
      localStorage.setItem('solicitudes', JSON.stringify(solicitudesGuardadas));

      alert('Solicitud enviada correctamente');
      this.solicitudForm.reset(); 
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
