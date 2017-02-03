import { Component, OnInit } from '@angular/core';
import { TNavRoute } from '../shared/models/general.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  routes: TNavRoute[];
  constructor() {
    this.routes = [{
      path: 'families',
      link: 'FAMILIES',
    }, {
      path: 'rooms',
      link: 'ROOMS'
    }, {
      path: 'children',
      link: 'CHILDREN'
    }, {
      path: 'details',
      link: 'CENTRE DETAILS'
    }, {
      path: 'subventions',
      link: 'SUBVENTIONS'
    }];
  }

  ngOnInit() {
  }

}
