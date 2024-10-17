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
  password!: string;

  constructor(private navCtrl: NavController, private storageService: StorageService) {}

  async onRegister() {
    await this.storageService.set('userName', this.name);  
    await this.storageService.set('userEmail', this.email);
    await this.storageService.set('userPassword', this.password);
    
    console.log('Usuario registrado:', this.name, this.email);
    this.navCtrl.navigateBack('/login');
  }
}
