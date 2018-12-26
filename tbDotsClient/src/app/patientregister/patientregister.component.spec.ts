import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientregisterComponent } from './patientregister.component';

describe('PatientregisterComponent', () => {
  let component: PatientregisterComponent;
  let fixture: ComponentFixture<PatientregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
