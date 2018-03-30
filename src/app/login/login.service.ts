/**
 * Created by aliska on 09.03.2018.
 */
import {Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class LoginService {
    generaly_form: FormGroup;
    form_step1: FormGroup;
    form_date: FormGroup;
    gender: string;
    selected: any = null;
    title = 'Signup';
    error = false;

    constructor() {}
}
