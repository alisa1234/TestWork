import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service'

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
