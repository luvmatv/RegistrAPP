import { Component } from '@angular/core';
import { NavController, ToastController, PopoverController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { NormasPopoverComponent } from '../../normas-popover/normas-popover.component';

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
    private toastController: ToastController,
    private popoverController: PopoverController
  ) {}

  async mostrarNormas(ev: Event) {
    const popover = await this.popoverController.create({
      component: NormasPopoverComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
    });
    await popover.present();
  }

  validateRutInput(event: any) {
    let input = event.target.value;

    input = input.replace(/[^0-9]/g, '');

    if (input.length > 9) {
      input = input.substring(0, 9);
    }

    this.rut = input;
  }

  async onRegister() {
    const namePattern = /^[a-zA-Z\s]*$/;
    if (!namePattern.test(this.name)) {
      const errorToast = await this.toastController.create({
        message: 'El nombre solo debe contener letras y espacios.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await errorToast.present();
      return;
    }

    const rutPattern = /^[0-9]+$/;
    if (!rutPattern.test(this.rut)) {
      const errorToast = await this.toastController.create({
        message: 'El RUT solo debe contener números.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await errorToast.present();
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*])/;
    if (!passwordPattern.test(this.password)) {
      const errorToast = await this.toastController.create({
        message: 'La contraseña debe incluir al menos una letra mayúscula y un carácter especial.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await errorToast.present();
      return;
    }

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
