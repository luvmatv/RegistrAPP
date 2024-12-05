import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.page.html',
  styleUrls: ['./actualizar-datos.page.scss'],
})
export class ActualizarDatosPage implements OnInit {
  userName: string = '';
  userEmail: string = '';

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.userName = await this.storageService.get('userName');
    this.userEmail = await this.storageService.get('userEmail');
  }

  goBack() {
    this.navCtrl.back();
  }

  async showConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmar cambios',
      message: '¿Está seguro de que desea guardar los cambios y cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.saveChanges();
          },
        },
      ],
    });

    await alert.present();
  }

  async saveChanges() {
    if (!this.userEmail || !this.userName) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingrese todos los campos.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    await this.storageService.set('userName', this.userName);
    await this.storageService.set('userEmail', this.userEmail);

    const toast = await this.toastController.create({
      message: 'Datos actualizados correctamente.',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    this.navCtrl.navigateBack('/login');
  }
}
