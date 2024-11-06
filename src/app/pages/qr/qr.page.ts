import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { StorageService } from '../../services/storage.service';  // Importa el StorageService

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  segment = 'generate';
  qrText = ''; // El RUT se asignará aquí
  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private navCtrl: NavController,
    private storageService: StorageService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Recupera el RUT almacenado al cargar la página
    this.loadUserRut();
    
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then(() => {
        BarcodeScanner.checkPermissions().then(() => {
          BarcodeScanner.removeAllListeners(); 
        });
      });
    }
  }

  async loadUserRut() {
    // Obtener el RUT del StorageService
    this.qrText = await this.storageService.get('userRut');
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

  goBack() {
    this.navCtrl.navigateBack('/main'); 
  }
}
