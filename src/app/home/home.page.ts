import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('loadingAnimation', { static: false }) loadingAnimation!: ElementRef;

  constructor(private navCtrl: NavController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.navCtrl.navigateForward('/login');
    }, 3000);  
  }
}
