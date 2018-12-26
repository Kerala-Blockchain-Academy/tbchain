import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { User } from '../tbdots';
import { createHash } from 'crypto-browserify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [ ]
})

export class SignUpComponent implements OnInit {

  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }

  public errorMsg: any;
  public myFullName:string='';
  public myUserName:string='';
  public myPassword:string='';

  ngOnInit() {
   
  }

  register(event) {
    if (this.myFullName.length ===0 || ! this.myFullName.trim() || this.myUserName.length ===0 || ! this.myUserName.trim() || this.myPassword.length === 0 || !this.myPassword.trim() ){
      this.errorMsg = "Please enter the details"      
    }else
    {
      var newUser = <User>{};
      newUser.ManuName = this.myFullName;
      newUser.UserName = this.myUserName;
      newUser.Password = this.Data.hash(this.myPassword);
      newUser.TimeStamp =  new Date().toTimeString();
      let passPharse = this.Data.hash(this.myUserName + this.myPassword);
      this.Data.genKeyPair(passPharse.slice(0,64));
      this.Data.addUser(this.myUserName,newUser);
      this.router.navigate(['home/login']);
    }          
  }
  
}
    
 



