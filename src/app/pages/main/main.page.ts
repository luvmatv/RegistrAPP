import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, NavController, AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit {
  userEmail: string | null = '';
  userName: string | null = '';
  currentTime: string = '';
  isDarkMode: boolean = false; 

  @ViewChild('welcomeText', { read: ElementRef }) welcomeText!: ElementRef;

  constructor(
    private authService: AuthService,
    private animationCtrl: AnimationController,
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private menu: MenuController 
  ) {}

  async ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
    this.userName = await this.storageService.get('userName');
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); 

   
    this.menu.enable(true, 'settings-menu');

   
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.isDarkMode = JSON.parse(savedDarkMode);
      this.applyDarkMode(); 
    }
  }

  ngAfterViewInit() {
    this.animateWelcomeText(); 
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); 
  }

  animateWelcomeText() {
    const welcomeAnimation = this.animationCtrl.create()
      .addElement(this.welcomeText.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-20px)', 'translateY(0px)');
    welcomeAnimation.play(); 
  }

 
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode(); 
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode)); 
  }


  applyDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark'); 
    } else {
      document.body.classList.remove('dark'); 
    }
  }

 
  async goToLogin() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateBack('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  goToQr() {
    this.navCtrl.navigateForward('/qr');
  }

  goToProfile() {
    this.navCtrl.navigateForward('/perfil');
  }

  goToHorario() {
    this.navCtrl.navigateForward('/horario');
  }


  openSettingsMenu() {
    this.menu.open('settings-menu'); 
  }

  async updateData() {
    const alert = await this.alertController.create({
      header: 'Actualizar Datos',
      message: 'Esta función aún no está implementada.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateBack('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
