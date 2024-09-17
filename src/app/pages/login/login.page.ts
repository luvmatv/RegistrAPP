import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, AnimationController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  email!: string;
  password!: string;
  errorMessage!: string;

  
  @ViewChild('emailInput', { read: ElementRef }) emailInput!: ElementRef;
  @ViewChild('passwordInput', { read: ElementRef }) passwordInput!: ElementRef;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private animationCtrl: AnimationController
  ) {}

  
  ngAfterViewInit() {
    this.animateInputs();
  }

  
  animateInputs() {
    
    const emailAnimation = this.animationCtrl.create()
      .addElement(this.emailInput.nativeElement)
      .duration(1000)
      .fromTo('opacity', 0, 1)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)');

  
    const passwordAnimation = this.animationCtrl.create()
      .addElement(this.passwordInput.nativeElement)
      .duration(1000)
      .fromTo('opacity', 0, 1)
      .fromTo('transform', 'translateX(100px)', 'translateX(0px)');

    
    emailAnimation.play();
    passwordAnimation.play();
  }

  onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      this.errorMessage = '';
      this.navCtrl.navigateForward('/main');
    } else {
      this.errorMessage = 'Contraseña incorrecta. Intenta de nuevo.';
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  changePassword() {
    this.navCtrl.navigateForward('/change-password');
  }
}
