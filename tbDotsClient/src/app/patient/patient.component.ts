import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { PatientIntake, Medicine } from '../tbdots';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  public patientName : string = '';
  public medid : string = '';
  public address : string = '';
  public errorMsg : string = '';

  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("Patient page",this.Data);
  }

  ngOnInit() {
    
  }

  intakeSubmit(event){
    if (this.medid.length === 0 || !this.medid.trim.toString()){
      this.errorMsg = "Please enter the details"      
    }else
    {
      var newPatient = <PatientIntake>{};
      newPatient.patientName = this.Data.retCurrentUser();
      newPatient.medid = this.medid;

      console.log("mnedi = " + newPatient.medid);
      //get the medicine id status
      let medPrefix = this.medid.toString().substr(0, 6); 
    //  this.Data.getMedidStatus(this.medid,newPatient,this.patientName);      

      this.address = this.Data.hash(this.Data.TB_FAMILY).substr(0, 6) + this.Data.hash(this.Data.TB_MEDICINE).substr(0,6) + this.Data.hash(medPrefix).substr(0, 6) + this.Data.hash(this.medid).substr(0,52);

      let addr = this.Data.getState(this.address);

      addr.then((stateDetails) => {
        const medicineDetails = JSON.parse(stateDetails);

        console.log("details from state : " + medicineDetails);
        if ( medicineDetails["Status"] == "Active" )
        {
          //update the status
          medicineDetails["Status"] = "Inactive";
          console.log("updated details : " + medicineDetails);

          let stateArr = stateDetails.split('"Status":"Active"');

          let newState = "";
          console.log(stateArr.length);
                            
          newState = stateArr[0] + '"Status":"Inactive"' + stateArr[1];
          console.log("New Value : " + newState);     
        // this.sendData('AddPatient', newState);   
          let stateArr1 = stateDetails.split(',');

          let stateArr2 = stateArr1[0].split('":"');
          let stateArr3 = stateArr1[1].split('":"');
          let stateArr4 = stateArr1[2].split('":"');
          let stateArr5 = stateArr1[3].split('":"');
          let stateArr6 = stateDetails.split('"TimeStamp":"');

          var newMedicine = <Medicine>{};
          newMedicine.medid = stateArr2[1].substring(0, stateArr2[1].length-1);
          newMedicine.Name = stateArr3[1].substring(0, stateArr3[1].length-1);
          newMedicine.combination = stateArr4[1].substring(0, stateArr4[1].length-1);
          newMedicine.CreatedBy = stateArr5[1].substring(0, stateArr5[1].length-1);
          newMedicine.Status = "Inactive";
          newMedicine.TimeStamp = stateArr6[1].substring(0, stateArr6[1].length - 2);

          //enter the intake details
          this.Data.addIntakeDetails(newPatient.patientName,newPatient,this.medid,newMedicine);
          
          this.router.navigate(['/pdashboard']);
        }else{
          console.log("Medicine is already taken.  please enter some other value");
          this.errorMsg = "Medicine is already taken.  please enter some other value";
          return;
        }
      })

      addr.catch((error) => {
        console.log("Error in get error"+ error.name);
        this.errorMsg = "Error in Medicine details";
        return;
      }); 




    }
  }

}
