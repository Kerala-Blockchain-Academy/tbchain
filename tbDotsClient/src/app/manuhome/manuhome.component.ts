import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manuhome',
  templateUrl: './manuhome.component.html',
  styles: []
})
export class ManuhomeComponent implements OnInit {

  constructor(private router : Router ,private Data : SawtoothService) { }

  ngOnInit() {
  }

}
