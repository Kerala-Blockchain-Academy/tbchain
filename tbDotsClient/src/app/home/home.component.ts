import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SawtoothService } from '../sawtooth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})

export class HomeComponent implements OnInit {

  constructor(private router :Router,private Data : SawtoothService) {
    
  
  };

  ngOnInit() {
  }

}
