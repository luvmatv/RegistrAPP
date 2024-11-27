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
        nombreUsuario: localStorage.getItem('nombreUsuario') || 'Anónimo', // Obtener el nombre del usuario desde localStorage
      };

      // Recuperar solicitudes existentes desde localStorage
      const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes') || '[]');

      // Agregar la nueva solicitud
      solicitudesGuardadas.push(solicitudData);

      // Guardar nuevamente en localStorage
      localStorage.setItem('solicitudes', JSON.stringify(solicitudesGuardadas));

      alert('Solicitud enviada correctamente');
      this.solicitudForm.reset(); // Limpia el formulario después de enviar
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
