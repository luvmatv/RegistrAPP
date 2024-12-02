import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { IpService } from '../../services/api.service';  

@Component({
  selector: 'app-profile',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userRut: string = '';
  userCareer: string = ''; 
  userRole: string = '';  
  userProfileImage: string | null = null;
  userInitial: string = '';
  city?: string;
  latitude?: number;  
  @ViewChild('canvas') canvas!: ElementRef;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private ipService: IpService  
  ) {}

  async ngOnInit() {
    await this.loadUserData();
    this.generateProfileImage();
    this.getIpInfo();
  }

  private async loadUserData() {
    try {
      this.userName = await this.storageService.get('userName') || '';
      this.userEmail = await this.storageService.get('userEmail') || '';
      this.userRut = await this.storageService.get('userRut') || '';
      this.userCareer = await this.storageService.get('userCareer') || ''; 
      this.userRole = await this.storageService.get('userRole') || '';  
      this.userInitial = this.userName.charAt(0).toUpperCase();
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  private generateProfileImage() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Error al obtener el contexto del canvas');
      return;
    }

    const size = 100;
    const color = '#a390d4';
    const textColor = 'white';

    canvas.width = size;
    canvas.height = size;

    context.fillStyle = color;
    context.fillRect(0, 0, size, size);

    context.fillStyle = textColor;
    context.font = 'bold 50px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.userInitial, size / 2, size / 2);

    this.userProfileImage = canvas.toDataURL();
  }

  private getIpInfo() {
    this.ipService.getIpInfo().subscribe(
      (data) => {
        this.city = data.city;  
        this.latitude = data.lat;  
        console.log(`Ciudad: ${this.city}, Latitud: ${this.latitude}`);  
      },
      (error) => {
        console.error('Error al obtener la información de la IP:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/main']);
  }
}
