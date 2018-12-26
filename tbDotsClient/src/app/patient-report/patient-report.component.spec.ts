import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportComponent } from './patient-report.component';

describe('PatientReportComponent', () => {
  let component: PatientReportComponent;
  let fixture: ComponentFixture<PatientReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
