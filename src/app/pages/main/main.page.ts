import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, NavController, AlertController } from '@ionic/angular'; 
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

  @ViewChild('welcomeText', { read: ElementRef }) welcomeText!: ElementRef;

  constructor(
    private authService: AuthService, 
    private animationCtrl: AnimationController,
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController 
  ) {}

  async ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
    this.userName = await this.storageService.get('userName'); 
  }

  ngAfterViewInit() {
    this.animateWelcomeText();
  }

  animateWelcomeText() {
    const welcomeAnimation = this.animationCtrl.create()
      .addElement(this.welcomeText.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-20px)', 'translateY(0px)');

    welcomeAnimation.play();
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
}
