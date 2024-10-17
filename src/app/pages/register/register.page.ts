import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email!: string;
  password!: string;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService 
  ) {}

  async onRegister() {
    
    if (!this.email || !this.password) {
      console.error('Por favor, completa todos los campos.');
      return;
    }

    
    await this.storageService.set('userEmail', this.email);
    await this.storageService.set('userPassword', this.password); 

    console.log('Usuario registrado:', this.email, this.password);
    this.navCtrl.navigateBack('/login'); 
  }
}
