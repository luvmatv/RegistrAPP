import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { NavController, ToastController } from '@ionic/angular';

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
    private toastController: ToastController
  ) {}

  async ngOnInit() {
   
    this.userName = await this.storageService.get('userName');
    this.userEmail = await this.storageService.get('userEmail');
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

    
    this.navCtrl.navigateBack('/home');
  }
}
