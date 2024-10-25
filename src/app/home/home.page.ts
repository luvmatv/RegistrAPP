import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, AnimationController } from '@ionic/angular';
import { IpService } from '../services/api.service';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('title', { read: ElementRef }) title!: ElementRef;
  @ViewChild('welcomeText', { read: ElementRef }) welcomeText!: ElementRef;
  @ViewChild('description', { read: ElementRef }) description!: ElementRef;
  @ViewChild('loginButton', { read: ElementRef }) loginButton!: ElementRef;

  city: string | undefined;  
  latitude: number | undefined;  

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController, private ipService: IpService) {}

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");  
    this.animateElements();
    this.getIpInfo();  
  }

  animateElements() {
    const titleAnimation = this.animationCtrl.create()
      .addElement(this.title.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateY(-100px)', 'translateY(0)')
      .fromTo('opacity', '0', '1');

    const welcomeAnimation = this.animationCtrl.create()
      .addElement(this.welcomeText.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(-50px)', 'translateX(0)')
      .delay(500);  
    
    const descriptionAnimation = this.animationCtrl.create()
      .addElement(this.description.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(50px)', 'translateX(0)')
      .delay(1000);  

    const buttonAnimation = this.animationCtrl.create()
      .addElement(this.loginButton.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(100px)', 'translateY(0)')
      .delay(1500);  

    titleAnimation.play();
    welcomeAnimation.play();
    descriptionAnimation.play();
    buttonAnimation.play();
  }

  getIpInfo() {
    this.ipService.getIpInfo().subscribe(
      (data) => {
        console.log(data);  
        this.city = data.city;  
        this.latitude = data.lat;  
        console.log(`Ciudad: ${this.city}, Latitud: ${this.latitude}`);  
      },
      (error) => {
        console.error('Error al obtener la información de la IP:', error);
      }
    );
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
