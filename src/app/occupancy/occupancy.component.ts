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
      path: 'rooms',
      link: 'Room Lists',
    },{
      path: 'waiting',
      link: 'Waiting Lists',
    },{
      path: 'trans',
      link: 'Transitions & Inductinns'
    }];
  }

  ngOnInit() {
  }

}
