import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {

  // form_step1: FormGroup;
  passwords: FormGroup;
  email: FormControl;
  password: FormControl;
  confirm_password: FormControl;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  step_2: boolean = false;
  email_model: string;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.createControls();
    this.createForm();
    if(typeof this.loginService.generaly_form !== 'undefined') {
    this.email_model = this.loginService.generaly_form.controls['user_data'].get('email').value;
    this.loginService.form_step1.get('email').patchValue(this.email_model);
    }
  }
  createControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.confirm_password = new FormControl('', [
      Validators.required
    ]);
  }
  createForm() {
    this.loginService.form_step1 = new FormGroup({
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    },
      {
        validators: this.checkPass
      });
  }
  checkPass(form: FormGroup) {
    const pass = form.controls['password'].value;
    const confirm_pass = form.controls['confirm_password'].value;
    return pass === confirm_pass ? null : { notSame: true };
  }
}
