import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  newPassword!: string;

  constructor(private navCtrl: NavController) {}

  onChangePassword() {
    console.log('Nueva contraseña:', this.newPassword);
    this.navCtrl.navigateBack('/login');
  }
}