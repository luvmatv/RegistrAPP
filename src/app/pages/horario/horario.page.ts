import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  userCareer: string = '';
  schedule: any[] = []; 
  careerName: string = '';

  subjectNames: { [key: string]: string } = {
    PGY4121: 'Programación Móvil',
    INF3123: 'Estructuras de Datos',
    ENF2111: 'Fundamentos de Enfermería',
    AUTO1010: 'Mecánica Automotriz',
  };

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.userCareer = await this.storageService.get('userCareer'); 
    this.careerName = this.getCareerName(this.userCareer); 

    
    this.loadSchedule();
  }


  getCareerName(careerCode: string): string {
    switch (careerCode) {
      case 'informatica':
        return 'Ingeniería en Informática';
      case 'enfermeria':
        return 'Técnico en Enfermería';
      case 'automotriz':
        return 'Automotriz';
      default:
        return 'Desconocida';
    }
  }


  getSubjectName(subjectCode: string): string {
    const subjectName = this.subjectNames[subjectCode];
    return subjectName ? `${subjectCode} - ${subjectName}` : `${subjectCode} - Asignatura desconocida`;
  }


  isClassInProgress(classDate: string, startTime: string, endTime: string): boolean {
    const now = new Date();
    const classDateTime = new Date(`${classDate} ${startTime}`);
    const classEndTime = new Date(`${classDate} ${endTime}`);

    return now >= classDateTime && now <= classEndTime;
  }


  loadSchedule() {

    if (this.userCareer === 'informatica') {
      this.schedule = [
        { subject: 'PGY4121', section: '012D', room: 'L9', date: '2024-11-04', startTime: '08:00', endTime: '10:00' },
        { subject: 'INF3123', section: '013A', room: 'L3', date: '2024-11-04', startTime: '10:30', endTime: '12:30' },
      ];
    } else if (this.userCareer === 'enfermeria') {
      this.schedule = [
        { subject: 'ENF2111', section: '010A', room: 'L5', date: '2024-11-04', startTime: '08:00', endTime: '10:00' },
      ];
    } else if (this.userCareer === 'automotriz') {
      this.schedule = [
        { subject: 'AUTO1010', section: '021B', room: 'L2', date: '2024-11-04', startTime: '08:00', endTime: '10:00' },
      ];
    }
  }
}
