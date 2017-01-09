import { Component, OnInit } from '@angular/core';
import { TNavRoute } from '../shared/models/general.model';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.scss']
})
export class OccupancyComponent implements OnInit {
  routes: TNavRoute[];
  constructor() { 
    this.routes = [{
      path: 'all',
      link: 'Dashboard',
    },{
      path: 'rooms',
      link: 'Room Lists',
    },{
      path: 'setup',
      link: 'Setup'
    },{
      path: 'trans',
      link: 'Transitions & Inductinns'
    }];
  }

  ngOnInit() {
  }

}
