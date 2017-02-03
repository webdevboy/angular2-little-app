import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occupancy-transitions',
  templateUrl: './occupancy-transitions.component.html',
  styleUrls: ['./occupancy-transitions.component.scss', '../occupancy.component.scss']
})
export class OccupancyTransitionsComponent implements OnInit {
  months: any[] = [];
  selectedDateID: string = "0";
  selectedDate: string = "View All";

  constructor() { 
    this.months = [
      {id: "1", name: "Jan 17", fullname:"January 2017", year:"2017", month:1, selected: false},
      {id: "2", name: "Feb 17", fullname:"February 2017", year:"2017", month:2, selected: false},
      {id: "3", name: "Mar 17", fullname:"March 2017", year:"2017", month:3, selected: false},
      {id: "4", name: "Apr 17", fullname:"April 2017", year:"2017", month:4, selected: false},
      {id: "5", name: "May 17", fullname:"May 2017", year:"2017", month:5, selected: false},
      {id: "6", name: "Jun 17", fullname:"June 2017", year:"2017", month:6, selected: false},
      {id: "7", name: "Jul 17", fullname:"July 2017", year:"2017", month:7, selected: false},
      {id: "8", name: "Aug 17", fullname:"August 2017", year:"2017", month:8, selected: false},
      {id: "9", name: "Sep 17", fullname:"September 2017", year:"2017", month:9, selected: false},
      {id: "10", name: "Oct 17", fullname:"October 2017", year:"2017", month:10, selected: false},
      {id: "11", name: "Nov 17", fullname:"November 2017", year:"2017", month:11, selected: false},
      {id: "12", name: "Dec 17", fullname:"December 2017", year:"2017", month:12, selected: false}
    ];
  }

  ngOnInit() {
    this.selectedDate = "View All";
  }

  selectDateTab(id: string){
    this.selectedDateID = id;
    this.selectedDate = "View All";

    this.months.forEach(data => {
      data.selected = false;
      if( data.id == id ){
        this.selectedDate = data.fullname;
        data.selected = true;
      }
    });
  }

}
