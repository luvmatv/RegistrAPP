import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-rasistencia',
  templateUrl: './rasistencia.page.html',
  styleUrls: ['./rasistencia.page.scss'],
})
export class RasistenciaPage implements OnInit {
  attendanceRecords: any[] = []; //Lista

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.loadAttendanceRecords();
  }

  async loadAttendanceRecords() {
    const records = await this.storageService.get('attendanceRecords');
    this.attendanceRecords = records ? JSON.parse(records) : [];
  }

  checkAttendanceStatus(date: string, subject: string): string {
    const record = this.attendanceRecords.find(
      (r) => r.date === date && r.subject === subject
    );
    return record ? 'Presente' : 'Ausente';
  }
}
