import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  steps: {[index: string]: boolean} = {};
  step_arr = [];
  isValid: boolean = false;
  isBack: boolean = false;
  progress: number = 33.3;

  constructor(private loginService: LoginService, public fb: FormBuilder) {
    this.steps['step_1'] = true;
    this.steps['step_2'] = false;
    this.steps['step_3'] = false;
    this.step_arr.length = 3;
  }
  ngOnInit() {
  }
  ngDoCheck() {
    if (this.isBack === true && this.loginService.form_step1.valid) {
      this.isValid = true;
    }
    if (typeof this.loginService.form_step1 !== 'undefined' && this.loginService.form_step1.valid && typeof this.loginService.generaly_form === 'undefined' || typeof this.loginService.form_date !== 'undefined' && this.loginService.form_date.valid){
      this.isValid = true;
    }
}
  NextStep() {
    if(this.steps['step_1'] === true) {
      let password;
      if(this.isBack === true){
        password = this.loginService.generaly_form.controls['user_data'].get('password').value;
      }else{
        password = this.loginService.form_step1.get('password').value;
      }
      const email = this.loginService.form_step1.get('email').value;
      this.loginService.generaly_form = this.fb.group({
        user_data: this.fb.group({
          email: new FormControl(),
          password: new FormControl(),
          date_of_birth: new FormControl(),
          gender: new FormControl(),
          how_hear_about_us: new FormControl()
        })
      });
      this.loginService.generaly_form.controls['user_data'].setValue({
        email: email,
        password: password,
        date_of_birth: '',
        gender: '',
        how_hear_about_us: ''
      });
      this.progress = this.progress * 2;
    }
    if(this.steps['step_2'] === true) {
      const email = this.loginService.generaly_form.controls['user_data'].get('email').value;
      const password = this.loginService.generaly_form.controls['user_data'].get('password').value;
      const gender = this.loginService.gender;
      const hear_about = this.loginService.selected;
      if (typeof gender === 'undefined') {
        this.loginService.error = true;
        this.isValid = false;
      }
      const newDate = (new Date(this.loginService.form_date.get('day').value + '/' + this.loginService.form_date.get('month').value + '/' + this.loginService.form_date.get('year').value)).getTime();
      this.loginService.generaly_form.controls['user_data'].setValue({
        email: email,
        password: password,
        date_of_birth: newDate,
        gender: gender,
        how_hear_about_us: hear_about
      });
      this.loginService.title = 'Thank You!';
      this.progress = this.progress + 33.3;
    }

    for (let i = 1; i < this.step_arr.length; i++) {
      if (this.steps['step_' + i] === true) {
        this.steps['step_' + i] = false;
        this.steps['step_' + ( i + 1 )] = true;
        break;
      }
    }
    this.isValid=false;
  }
  Back() {
    this.isBack = true;
    this.progress = this.progress - 33.3;
    for (let i = 1; i < this.step_arr.length; i++) {
      if (this.steps['step_' + i] === true) {
        this.steps['step_' + i] = false;
        this.steps['step_' + ( i - 1 )] = true;
        break;
      }
    }
  }
}
