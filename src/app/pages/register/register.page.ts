import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
  selectedCareer: string = 'informatica';
  role!: string; 

  constructor(
    private navCtrl: NavController, 
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async onRegister() {
    
    if (this.email.endsWith('@profesor.duoc.cl')) {
      this.role = 'profesor';
    } else if (this.email.endsWith('@alumno.duoc.cl')) {
      this.role = 'estudiante';
    } else {
      const errorToast = await this.toastController.create({
        message: 'Correo inválido. Debe ser @profesor.duoc.cl o @alumno.duoc.cl',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await errorToast.present();
      return; 
    }

    await this.storageService.set('userName', this.name);
    await this.storageService.set('userEmail', this.email);
    await this.storageService.set('userRut', this.rut);
    await this.storageService.set('userPassword', this.password);
    await this.storageService.set('userCareer', this.selectedCareer);
    await this.storageService.set('userRole', this.role);

    const toast = await this.toastController.create({
      message: 'Registro exitoso',
      duration: 2000,
      position: 'top'
    });
    await toast.present();

    this.name = '';
    this.email = '';
    this.rut = '';
    this.password = '';
    this.selectedCareer = 'informatica';
    this.role = '';
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
