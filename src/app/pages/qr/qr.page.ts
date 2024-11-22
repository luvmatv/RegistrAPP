import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavController, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  segment = 'generate'; 
  scanResult = ''; 

  qrRedirectUrl = 'asistencia';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private navCtrl: NavController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    if (this.platform.is('capacitor')) {
      const isSupported = await BarcodeScanner.isSupported();
      if (isSupported) {
        await BarcodeScanner.checkPermissions();
        BarcodeScanner.removeAllListeners();
      }
    }
  }

  async startScan() {
    const userRole = await this.storageService.get('userRole');
    if (userRole !== 'estudiante') {
      const toast = await this.toastController.create({
        message: 'Solo los estudiantes pueden usar el lector QR.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { formats: [], LensFacing: LensFacing.Back },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const scannedUrl = data?.barcode?.displayValue || '';
      this.scanResult = scannedUrl;

      if (scannedUrl === this.qrRedirectUrl) {
        this.navCtrl.navigateForward('/asistencia'); 
      } else {
        const toast = await this.toastController.create({
          message: 'El QR escaneado no es válido para redirigir.',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/main');
  }
}
