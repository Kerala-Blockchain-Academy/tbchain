import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientloginComponent } from './patientlogin.component';

describe('PatientloginComponent', () => {
  let component: PatientloginComponent;
  let fixture: ComponentFixture<PatientloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
