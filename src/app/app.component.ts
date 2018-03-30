import { Component } from '@angular/core';
import {RouterLinkActive, Router, NavigationEnd, ActivatedRoute,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-login></app-login>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
