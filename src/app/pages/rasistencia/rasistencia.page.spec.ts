import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RasistenciaPage } from './rasistencia.page';

describe('RasistenciaPage', () => {
  let component: RasistenciaPage;
  let fixture: ComponentFixture<RasistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
