import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';

import { Medicine } from '../tbdots';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styles: [
    "styles.css"
  ]
})

export class EnrollComponent implements OnInit {
  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }

  public givenName:string = '';
  public medid:string = '';
  public combination:string = '';
  public errorMsg:string ='';

  ngOnInit() { } 

  enroll(event) {
    //check the details
    if (!this.givenName.trim() || this.givenName.length === 0 || !this.medid.trim() || this.medid.length === 0 || !this.combination.trim() || this.combination.length === 0 ) {
      this.errorMsg = "Please enter the details";
    }
    else
    {      
      var newMedicine = <Medicine>{};
      newMedicine.medid = this.medid;
      newMedicine.Name = this.givenName;
      newMedicine.combination = this.combination;
      newMedicine.CreatedBy = this.Data.retCurrentUser();
      newMedicine.Status = "Active";
      newMedicine.TimeStamp = new Date().toString();
      this.Data.addMedicine(this.medid,newMedicine)
      this.router.navigate(['dashboard']);
    }     
  }
   
}
    
 



