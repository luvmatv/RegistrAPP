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
  qrText = ''; 
  scanResult = ''; 

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private navCtrl: NavController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadUserRut(); 

    if (this.platform.is('capacitor')) {
      const isSupported = await BarcodeScanner.isSupported();
      if (isSupported) {
        await BarcodeScanner.checkPermissions();
        BarcodeScanner.removeAllListeners();
      }
    }
  }

  async loadUserRut() {
    this.qrText = await this.storageService.get('userRut');
  }

  async startScan() {
    const userRole = await this.storageService.get('userRole');
    if (userRole !== 'estudiante') {
      const toast = await this.toastController.create({
        message: 'Solo los alumnos pueden registrar asistencia.',
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
      const scannedRut = data?.barcode?.displayValue || '';
      this.scanResult = scannedRut;

      const success = await this.markAttendance(scannedRut);
      if (success) {
        const toast = await this.toastController.create({
          message: 'Asistencia registrada exitosamente.',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'El estudiante no está inscrito en la clase actual.',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    }
  }

  async markAttendance(studentRut: string): Promise<boolean> {
    const now = new Date();

    const schedule = await this.storageService.get('schedule') || [];

    for (const classItem of schedule) {
      const classStartTime = new Date(`${classItem.date} ${classItem.startTime}`);
      const classEndTime = new Date(`${classItem.date} ${classItem.endTime}`);

      if (now >= classStartTime && now <= classEndTime) {
        classItem.attendance = classItem.attendance || [];
        if (!classItem.attendance.includes(studentRut)) {
          classItem.attendance.push(studentRut);
          await this.storageService.set('schedule', schedule); 
          return true; 
        }
      }
    }
    return false; 
  }

  goBack() {
    this.navCtrl.navigateBack('/main');
  }
}
