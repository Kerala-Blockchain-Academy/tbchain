import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { Patient, Patients } from '../tbdots';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styles: []
})
export class PatientregisterComponent implements OnInit {
  
  public errorMsg: any;
  public myFullName:string='';
  public myUserName:string='';
  public myPassword:string='';

  constructor(private router : Router ,private Data : SawtoothService) { 

  }

  ngOnInit() {
  }

  patientregister(event){

    if (this.myFullName.length ===0 || ! this.myFullName.trim() || this.myUserName.length ===0 || ! this.myUserName.trim() || this.myPassword.length === 0 || !this.myPassword.trim() ){
      this.errorMsg = "Please enter the details"      
    }else
    {
      var newPatient = <Patient>{};
      newPatient.FullName = this.myFullName;
      newPatient.UserName = this.myUserName;
      newPatient.Password = this.Data.hash(this.myPassword);
      newPatient.TimeStamp =  new Date().toTimeString();
      let passPharse = this.Data.hash(this.myUserName + this.myPassword);

      var newPatients = <Patients>{};
      newPatients.FullName = this.myFullName;
      newPatients.UserName = this.myUserName;

      this.Data.genKeyPair(passPharse.slice(0,64));
      this.Data.addPatient(this.myUserName,newPatient,newPatients);
      this.router.navigate(['/patient/patientlogin']);
    }
  }

}
