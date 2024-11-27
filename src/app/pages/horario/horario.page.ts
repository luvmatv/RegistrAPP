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
    PGY4131: 'Desarrollo de Software',  
    INF3132: 'Bases de Datos',
    ENF2122: 'Cuidados de Pacientes',
    AUTO1020: 'Automatización Industrial',
    ENF2133: 'Ética Profesional',
    AUTO1030: 'Mantenimiento Vehicular',
  };

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.userCareer = await this.storageService.get('userCareer');  
    this.careerName = this.getCareerName(this.userCareer);           
    this.loadSchedule();  
  }

  getCareerName(careerCode: string): string {
    switch (careerCode) {
      case 'informatica': return 'Ingeniería en Informática';
      case 'enfermeria': return 'Técnico en Enfermería';
      case 'automotriz': return 'Automotriz';
      default: return 'Desconocida';
    }
  }

  async loadSchedule() {
    const currentDate = new Date().toISOString().split('T')[0]; 

    if (this.userCareer === 'informatica') {
      this.schedule = [
        { subject: 'PGY4121', section: '012D', room: 'L9', date: currentDate, startTime: '08:00', endTime: '10:00', attended: false },
        { subject: 'INF3123', section: '013A', room: 'L3', date: currentDate, startTime: '10:30', endTime: '12:30', attended: false },
        { subject: 'PGY4131', section: '014B', room: 'L5', date: currentDate, startTime: '14:00', endTime: '16:00', attended: false },  
        { subject: 'INF3132', section: '015C', room: 'L6', date: currentDate, startTime: '16:30', endTime: '18:30', attended: false },  
      ];
    } else if (this.userCareer === 'enfermeria') {
      this.schedule = [
        { subject: 'ENF2111', section: '010A', room: 'L5', date: currentDate, startTime: '08:00', endTime: '10:00', attended: false },
        { subject: 'ENF2122', section: '011B', room: 'L4', date: currentDate, startTime: '10:30', endTime: '12:30', attended: false },  
        { subject: 'ENF2133', section: '012C', room: 'L7', date: currentDate, startTime: '13:00', endTime: '15:00', attended: false },  
      ];
    } else if (this.userCareer === 'automotriz') {
      this.schedule = [
        { subject: 'AUTO1010', section: '021B', room: 'L2', date: currentDate, startTime: '08:00', endTime: '10:00', attended: false },
        { subject: 'AUTO1020', section: '022C', room: 'L8', date: currentDate, startTime: '10:30', endTime: '12:30', attended: false },  
        { subject: 'AUTO1030', section: '023D', room: 'L9', date: currentDate, startTime: '13:00', endTime: '15:00', attended: false },  
      ];
    }

    await this.storageService.set('schedule', this.schedule);
  }

  getSubjectName(subjectCode: string): string {
    const subjectName = this.subjectNames[subjectCode];
    return subjectName ? `${subjectCode} - ${subjectName}` : `${subjectCode} - Asignatura desconocida`;
  }

  isClassInProgress(classDate: string, startTime: string, endTime: string): boolean {
    const currentDate = new Date();
    const classDateTimeStart = new Date(`${classDate}T${startTime}`);
    const classDateTimeEnd = new Date(`${classDate}T${endTime}`);

    return currentDate >= classDateTimeStart && currentDate <= classDateTimeEnd;
  }
}
