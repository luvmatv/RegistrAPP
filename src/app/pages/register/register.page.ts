import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name!: string;  
  email!: string;
  rut!: string;
  password!: string;
  selectedCareer: string = 'informatica'; // Inicializa con un valor por defecto


  constructor(private navCtrl: NavController, private storageService: StorageService) {}


  async onRegister() {
    // Guardar los datos del usuario en el almacenamiento
    await this.storageService.set('userName', this.name);  
    await this.storageService.set('userEmail', this.email);
    await this.storageService.set('userRut', this.rut);
    await this.storageService.set('userPassword', this.password);
    await this.storageService.set('userCareer', this.selectedCareer); // Almacenar carrera seleccionada


    console.log('Usuario registrado:', this.name, this.email, this.rut, this.selectedCareer);
    this.navCtrl.navigateForward('/perfil', {
      queryParams: {
        career: this.selectedCareer
      }
    });
  }


  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
