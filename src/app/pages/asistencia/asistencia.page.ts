import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  currentClass: any = null; 
  attendanceRecords: any[] = []; 
  userRole: string = ''; 

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.userRole = await this.storageService.get('userRole'); 
    const schedule = await this.storageService.get('schedule');
    this.findCurrentClass(schedule);
    this.loadAttendanceRecords();
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
}
