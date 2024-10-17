import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular'; 
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
    private storageService: StorageService 
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

  goToLogin() {
    this.navCtrl.navigateBack('/login');  
  }
}
