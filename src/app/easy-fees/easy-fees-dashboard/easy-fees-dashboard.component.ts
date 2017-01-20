import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-easy-fees-dashboard',
  templateUrl: './easy-fees-dashboard.component.html',
  styleUrls: ['./easy-fees-dashboard.component.scss', '../easy-fees.component.scss']
})
export class EasyFeesDashboardComponent implements OnInit {

  week: any[] = [];
  currentDate: moment.Moment = moment().startOf('isoWeek');

  sortFlag: boolean = false;
  accordionState: boolean = false;
  sort: string = "0";

  constructor() { 
    this.dateChange();
  }

  ngOnInit() {
  }

  sortOrder(sort: string) {
    this.sort = sort;
    this.sortFlag = false;
  }

  prevMonth() {
    this.currentDate.subtract(1, 'month');
    this.dateChange();
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.dateChange();
  }

  dateChange() {
    let startOfWeek = moment(this.currentDate).startOf('isoWeek');
    let currentWeek = { start: +startOfWeek.format('x'), end: 0 };
    let daysOfWeek = [];

    while(startOfWeek.isoWeekday() <= 5) {
      daysOfWeek.push({
        day: startOfWeek.format('dddd'),
        date: startOfWeek.format('Do'),
        inactive: !startOfWeek.isSame(moment(this.currentDate), 'month')
      });
      startOfWeek.add(1, 'day');
    }
    currentWeek.end = +startOfWeek.format('x');
    this.week = daysOfWeek;
  }

  selectRow(){
    if( !this.accordionState ) this.accordionState = true;
      else this.accordionState = false; 
  }
}
