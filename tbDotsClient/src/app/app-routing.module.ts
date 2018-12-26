import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { PatientComponent } from './patient/patient.component';
import { PatienthomeComponent } from './patienthome/patienthome.component';
import { PatientregisterComponent } from './patientregister/patientregister.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { ManuhomeComponent } from './manuhome/manuhome.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { PatientReportComponent } from './patient-report/patient-report.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignUpComponent
        },    
    ]
  },
  
  {
    path: 'patient',
    component: PatienthomeComponent,
    children: [
      {
        path: 'patientregister',
        component: PatientregisterComponent
      },
      {
        path: 'patientlogin',
        component: PatientloginComponent        
      },      
    ]
  },
  {
    path: 'dashboard',
    component: ManuhomeComponent,
    children: [
      {
        path: 'enroll',
        component: EnrollComponent
      },
    ]
  },
  {
    path: 'pdashboard',
    component: PatientdashboardComponent,
    children: [
      {
        path: 'patient',
        component: PatientComponent        
      },
    ]
  },
  {
    path: 'report',
    component: DashboardComponent,
    children: [
      {
        path : 'patientReport',
        component: PatientReportComponent
      },
      {
        path : 'details',
        component: PatientdashboardComponent
      },
    ]
  },  
]

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  // CommonModule

  declarations: []
})

export class AppRoutingModule { }
