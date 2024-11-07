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

  constructor(
    private navCtrl: NavController, 
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async onRegister() {
    await this.storageService.set('userName', this.name);
    await this.storageService.set('userEmail', this.email);
    await this.storageService.set('userRut', this.rut);
    await this.storageService.set('userPassword', this.password);
    await this.storageService.set('userCareer', this.selectedCareer);


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
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
