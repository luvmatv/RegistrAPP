import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email!: string;
  password!: string;

  constructor(private navCtrl: NavController) {}

  onRegister() {
   
    console.log('Usuario registrado:', this.email, this.password);
    this.navCtrl.navigateBack('/login');
  }
}