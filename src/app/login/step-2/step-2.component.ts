import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
export class Step2Component implements OnInit {
  day: FormControl;
  month: FormControl;
  year: FormControl;
  selected: any = null;
  error: boolean = false;
  choose: {[index: string]: boolean} = {};
  day_pattern = '^([1-9]|[12][0-9]|3[01])$';
  month_pattern = '^(1[0-2]|[1-9])$';

  constructor(private loginService: LoginService) {
    this.choose['male'] = false;
    this.choose['famale'] = false;
    this.choose['unspecified'] = false;
  }
  ngOnInit() {
    this.createControls();
    this.createForm();
  }
  createControls() {
    this.day = new FormControl('', [
      Validators.required,
      Validators.pattern(this.day_pattern),
    ]);
    this.month = new FormControl('', [
      Validators.required,
      Validators.pattern(this.month_pattern),
    ]);
    this.year = new FormControl('', [
      Validators.required
    ]);
  }
  createForm() {
    this.loginService.form_date = new FormGroup({
      day: this.day,
      month: this.month,
      year: this.year,
      gender: new FormControl(),
      how_hear_about_us: new FormControl()
    },
      {
        validators: this.leapYear
      });
  }
  leapYear(form: FormGroup) {
    const year = form.get('year').value;
    const current = new Date();
    const today = current.getFullYear();
    if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
      if (form.get('day').value >= '29' && year !== '') {
        return {leap: true};
      }
    }
    if ((today - Number.parseInt(year)) < 18) {
      return {young:true};
    }
    };
  getGender(value) {
    if (typeof value === 'undefined') {
      this.error = true;
    }
    for (const key in this.choose) {
      this.choose[key] = false;
      this.choose[value] = true;
    }
    this.loginService.gender = value;
  }
  Selected(value) {
    this.loginService.selected = value;
    // this.loginService.form_date.controls['gender'].setValue(this.gender);
    // this.loginService.form_date.controls['how_hear_about_us'].setValue(this.selecting);
    // debugger;

  }
}
