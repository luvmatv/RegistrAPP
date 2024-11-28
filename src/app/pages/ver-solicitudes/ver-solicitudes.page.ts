import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.page.html',
  styleUrls: ['./ver-solicitudes.page.scss'],
})
export class VerSolicitudesPage implements OnInit {
  solicitudes: any[] = []; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarSolicitudes(); 
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
    localStorage.removeItem('solicitudes'); 
    this.solicitudes = []; 
    alert('Todas las solicitudes han sido eliminadas.');
  }
}
