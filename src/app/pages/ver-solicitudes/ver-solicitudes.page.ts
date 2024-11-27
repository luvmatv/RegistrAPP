import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio AuthService

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.page.html',
  styleUrls: ['./ver-solicitudes.page.scss'],
})
export class VerSolicitudesPage implements OnInit {
  solicitudes: any[] = []; // Lista de solicitudes cargadas

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarSolicitudes(); // Cargar las solicitudes al iniciar
  }

  cargarSolicitudes() {
    const solicitudesGuardadas = localStorage.getItem('solicitudes');
    if (solicitudesGuardadas) {
      this.solicitudes = JSON.parse(solicitudesGuardadas);
    } else {
      this.solicitudes = [];
    }
  }

  limpiarSolicitudes() {
    localStorage.removeItem('solicitudes'); // Borra todas las solicitudes del localStorage
    this.solicitudes = []; // Limpia la lista mostrada
    alert('Todas las solicitudes han sido eliminadas.');
  }
}
