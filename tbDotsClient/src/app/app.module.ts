import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient/patient.component';
import { PatientregisterComponent } from './patientregister/patientregister.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { PatienthomeComponent } from './patienthome/patienthome.component';
import { ManuhomeComponent } from './manuhome/manuhome.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientReportComponent } from './patient-report/patient-report.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    EnrollComponent,
    DashboardComponent,
    PatientComponent,
    PatientregisterComponent,
    PatientloginComponent,
    PatienthomeComponent,
    ManuhomeComponent,
    PatientdashboardComponent,
    PatientReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
