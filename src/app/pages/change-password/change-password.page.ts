import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  email!: string;
  newPassword!: string;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private storageService: StorageService
  ) {}

  async onRequestPasswordReset() {
    if (this.email && this.newPassword) {
      console.log('Correo electrónico:', this.email);
      console.log('Nueva contraseña:', this.newPassword);

      await this.storageService.set('userPassword', this.newPassword);

      await this.showSuccessAlert();

      this.navCtrl.navigateBack('/login');
    } else {
      this.showAlert('Campo requerido', 'Por favor, ingresa tu correo electrónico y la nueva contraseña.');
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Solicitud de Cambiar Contraseña',
      message: 'Se ha actualizado tu contraseña exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
