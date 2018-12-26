import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { PatientIntake, Medicine } from '../tbdots';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styles: []
})
export class PatientReportComponent implements OnInit {

  public patientGroup:string[];
  private address: any;
  private patient1: any;
  private patient2: any;
  private medicine1: any;
  public medicineGroup:string[];
  public medicineGroup1:string[];

  constructor(private router:Router, private Data : SawtoothService) {
    //get all patients list
    this.patientGroup = new Array;
    this.address = this.Data.hash(this.Data.TB_FAMILY).substr(0, 6) + this.Data.hash(this.Data.TB_PATIENTS).substr(0,64);
    let patientList = this.Data.getState(this.address);

    patientList.then((patientVal) => {
      const tempArray = patientVal.split('|');

      for (var idx = 0; idx < tempArray.length; idx++) {
        const patientDetails = JSON.parse(tempArray[idx])

        console.log(patientDetails);

        //this.patientGroup.push(patientDetails["FullName"]);
        this.patientGroup.push(patientDetails);
      }   
    })

    patientList.catch((error) => {      
      console.log("Error in fetching the details : "+ error.name);
    }); 
  }

  ngOnInit() {   
  }

  onChange(event)
  {
      this.patient1 = event.target.value;
      console.log(this.patient1)    
      this.medicineGroup = new Array;

      //get medicine details
      this.address = this.Data.hash(this.Data.TB_FAMILY).substr(0, 6) + this.Data.hash(this.Data.TB_INTAKE).substr(0,6) + this.Data.hash(this.patient1.toString()).substr(0, 58);
      let medicineList = this.Data.getState(this.address); 

      medicineList.then((medicineVal) => {
        const tempArray = medicineVal.split('|');
  
        for (var idx = 0; idx < tempArray.length; idx++) {
          const medicineDetails = JSON.parse(tempArray[idx])
  
          console.log(medicineDetails);
          
          this.medicineGroup.push(medicineDetails);
        }   
      })
  
      medicineList.catch((error) => {      
        console.log("Error in fetching the medicine details : "+ error.name);
      }); 
  }

  onChange1(event)
  {
    this.medicine1 = event.target.value;
    console.log(this.medicine1)   

    this.medicineGroup1 = new Array;
    let medPrefix = this.medicine1.toString().substr(0, 6); 
    let flag = 0;
    //get medicine details
    this.address = this.Data.hash(this.Data.TB_FAMILY).substr(0, 6) + this.Data.hash(this.Data.TB_MEDICINE).substr(0,6) + this.Data.hash(medPrefix).substr(0, 6) + this.Data.hash(this.medicine1).substr(0, 52);

    let medicineList1 = this.Data.getState(this.address); 

    medicineList1.then((medicineVal) => {
      const tempArray = medicineVal.split('|');
      flag = 1;
      for (var idx = 0; idx < tempArray.length; idx++) {
        const medicineDetails1 = JSON.parse(tempArray[idx])

        console.log(medicineDetails1);
        
        this.medicineGroup1.push(medicineDetails1);
      }   
    })

    medicineList1.catch((error) => {      
      console.log("Error in fetching the medicine details : "+ error.name);
    }); 
  }
}
