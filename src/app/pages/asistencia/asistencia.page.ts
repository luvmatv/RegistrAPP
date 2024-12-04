import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  currentClass: any = null;
  attendanceRecords: any[] = [];
  userRole: string = '';
  currentLocation: any = { latitude: 0, longitude: 0 };

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.userRole = await this.storageService.get('userRole');
    const schedule = await this.storageService.get('schedule');
    this.findCurrentClass(schedule);
    this.loadAttendanceRecords();
    await this.getCurrentLocation();
  }

  findCurrentClass(schedule: any[]) {
    const currentDate = new Date();
    this.currentClass = schedule.find((classItem: any) => {
      const classStart = new Date(`${classItem.date}T${classItem.startTime}`);
      const classEnd = new Date(`${classItem.date}T${classItem.endTime}`);
      return currentDate >= classStart && currentDate <= classEnd;
    });
  }

  async loadAttendanceRecords() {
    const records = await this.storageService.get('attendanceRecords');
    this.attendanceRecords = records ? JSON.parse(records) : [];
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentLocation = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  }

  async markAttendance() {
    if (!this.currentClass) {
      alert('No hay una clase en curso para marcar asistencia.');
      return;
    }

    const existingRecord = this.attendanceRecords.find(
      (record) =>
        record.date === this.currentClass.date &&
        record.startTime === this.currentClass.startTime &&
        record.subject === this.currentClass.subject
    );

    if (existingRecord) {
      alert('Ya has marcado asistencia para esta clase.');
      return;
    }

    const distance = this.calculateDistance(
      this.currentLocation.latitude,
      this.currentLocation.longitude,
      this.currentClass.latitude,
      this.currentClass.longitude
    );

    if (distance > 50) {
      alert('Estás fuera del rango permitido para marcar asistencia.');
      return;
    }

    const newRecord = {
      subject: this.currentClass.subject,
      date: this.currentClass.date,
      startTime: this.currentClass.startTime,
      endTime: this.currentClass.endTime,
      room: this.currentClass.room,
      status: 'Asistido',
    };

    this.attendanceRecords.push(newRecord);
    await this.storageService.set('attendanceRecords', JSON.stringify(this.attendanceRecords));
    alert('Asistencia marcada exitosamente.');
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // Distancia en millas
    dist = dist * 1.609344; // Convertir a kilómetros
    return dist * 1000; // Convertir a metros
  }
}
