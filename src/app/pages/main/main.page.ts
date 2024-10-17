import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit {
  userEmail: string | null = '';

  @ViewChild('welcomeText', { read: ElementRef }) welcomeText!: ElementRef;

  constructor(private authService: AuthService, private animationCtrl: AnimationController, private navCtrl: NavController) {} 

  ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
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

  goToLogin() {
    this.navCtrl.navigateBack('/login'); 
  }
}
