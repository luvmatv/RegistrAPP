import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  email!: string;

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async onRequestPasswordReset() {
    if (this.email) {
      console.log('Correo electrónico:', this.email);
      
      // Simular el envío de la solicitud de cambio de contraseña
      await this.showSuccessAlert();
      
      // Navegar de regreso al login
      this.navCtrl.navigateBack('/login');
    } else {
      this.showAlert('Campo requerido', 'Por favor, ingresa tu correo electrónico.');
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Solicitud de Recuperación',
      message: 'Se ha enviado un correo de recuperación a tu dirección de email.',
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
