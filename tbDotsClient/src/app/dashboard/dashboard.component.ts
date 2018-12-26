import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent implements OnInit {
  constructor(private router : Router ,private Data : SawtoothService) { }
  
  public isDisabled = true;
  ngOnInit() {
  }

  continue(event)
  {
    this.router.navigate(['login']);
  }

  onClick(event){console.log("clicked"); !this.isDisabled;}

}
