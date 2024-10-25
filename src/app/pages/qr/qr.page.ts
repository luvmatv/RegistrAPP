import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular'; // Inyecta Platform aquí
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  segment = 'generate';
  qrText = 'qr';
  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform 
  ) {}

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then(() => {
        BarcodeScanner.checkPermissions().then(() => {
          BarcodeScanner.removeAllListeners(); 
        });
      });
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats: [], 
        LensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue || '';
    }
  }
}
