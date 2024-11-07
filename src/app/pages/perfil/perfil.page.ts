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
  userProfileImage: string | null = null;
  userInitial: string = '';
  city: string | undefined; 
  latitude: number | undefined;  
  @ViewChild('canvas') canvas!: ElementRef;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private ipService: IpService  
  ) {}

  async ngOnInit() {

    this.userName = await this.storageService.get('userName');
    this.userEmail = await this.storageService.get('userEmail');
    this.userRut = await this.storageService.get('userRut');
    this.userInitial = this.userName.charAt(0).toUpperCase();
    this.generateProfileImage();


    this.getIpInfo();
  }

  generateProfileImage() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      const size = 100;
      const color = '#4CAF50';
      const textColor = 'white';

      canvas.width = size;
      canvas.height = size;

      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = textColor;
      context.font = 'bold 50px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(this.userInitial, size / 2, size / 2);

      this.userProfileImage = canvas.toDataURL();
    }
  }

  getIpInfo() {
    this.ipService.getIpInfo().subscribe(
      (data) => {
        console.log(data);  
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
