import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { createHash } from 'crypto-browserify';
import {Buffer} from 'buffer/';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { Login } from '../tbdots';
@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styles: []
})

export class PatientloginComponent implements OnInit {

  public errorMsg: any;
  public myfield_control: any;
  public myUserName:string='';
  public myPassword:string='';
  private address: any;   

  constructor(private router : Router ,private Data : SawtoothService) { }

  ngOnInit() {
  }

  patientlogin(event){
    //check the details
    if (this.myUserName.length ===0 || ! this.myUserName.trim().toString() || this.myPassword.length === 0 || !this.myPassword.trim()){
      this.errorMsg = "Error in User Name or Password"      
    }else
    {
      var newLogin = <Login>{};
      newLogin.UserName = this.myUserName;
      newLogin.Password = this.Data.hash(this.myPassword);
      this.address = this.Data.hash(this.Data.TB_FAMILY).substr(0, 6) + this.Data.hash(this.Data.TB_PATIENT).substr(0,7) + this.Data.hash(this.myUserName).substr(0, 57);
      let addr = this.Data.getState(this.address);

      addr.then((string) => {
        const vacc = JSON.parse(string)
        let passwd = vacc["Password"];
        if ( newLogin.Password === passwd )
        {
          let passPharse = this.Data.hash(this.myUserName);
          this.Data.genKeyPair(passPharse.slice(0,64));
          this.Data.setCurrentUser(this.myUserName);
          this.router.navigate(['/pdashboard']);
        }
        this.errorMsg = "Error in User Name or Password";
      })

      addr.catch((error) => {
        console.log("Error in get error"+ error.name);
        this.errorMsg = "Error in User Name or Password";
        return;
      }); 
    }    
  }

}