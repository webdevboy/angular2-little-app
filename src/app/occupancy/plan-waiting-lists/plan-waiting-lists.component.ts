import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Staff, QualificationType, AgeGroup, Rooms, Child } from '../occupancy.model';

@Component({
  selector: 'app-plan-waiting-lists',
  templateUrl: './plan-waiting-lists.component.html',
  styleUrls: ['./plan-waiting-lists.component.scss','../occupancy.component.scss']
})
export class PlanWaitingListsComponent implements OnInit, OnDestroy {

  rooms: Rooms[];
  childs: Child[] = [];
  pureStore: Child[] = [];
  waitingChild: Child[] = [];
  deposit: any = [];
  selectedChild: Child;
  months: any = [];

  week: any[] = [];
  currentDate: moment.Moment = moment().startOf('isoWeek');
  
  showOccupancyModal: boolean = false;
  showChildModal: boolean = false;

  title: string = "";
  selectedDateID: string = "0";
  selectedDateFullName: string = "View All";

  constructor() {
    /******************** fake data ********************* */
    this.deposit = [
      {id: "1", name: "PAID"},
      {id: "2", name: "NOT PAID"},
      {id: "3", name: "ENQUIRE ONLY"}
    ];

    this.waitingChild = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2017-01-16T20:11:14.171Z",roomStartdate:"",roomEnddate:"",paperwork:true,assignedRoom:"1", movetoRoom: "2", movetoDate: "2016-12-22", parentName: "Maria Demery", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2017-02-16T20:11:14.171Z",roomStartdate:"",roomEnddate:"",paperwork:false,assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "Jane Dherty", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate: "2017-03-16T20:11:14.171Z", roomStartdate: "",roomEnddate:"",paperwork:true, assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "Parent Dai", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } }
    ];
    this.pureStore = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2017-01-16T20:11:14.171Z",roomStartdate:"",roomEnddate:"",paperwork:true,assignedRoom:"1", movetoRoom: "2", movetoDate: "2016-12-22", parentName: "Maria Demery", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2017-02-16T20:11:14.171Z",roomStartdate:"",roomEnddate:"",paperwork:false,assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "Jane Dherty", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate: "2017-03-16T20:11:14.171Z", roomStartdate: "",roomEnddate:"",paperwork:true, assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "Parent Dai", parentEmail:"parent@mail.com", deposit:false, assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } }
    ];

    this.rooms = [
      {id: "1", name: "Baby Room 1", ageGroup: "1", capacity: { mon:{am:"3",pm:"0"}, tue:{am:"0",pm:"3"}, wed:{am:"3",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"3",pm:"0"} }, transitionRoom: "2", transitionAge: "1", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "2", name: "Baby Room 2", ageGroup: "2", capacity: { mon:{am:"0",pm:"5"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"5"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"5"} }, transitionRoom: "3", transitionAge: "2", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "3", name: "Wobbler Room 1", ageGroup: "3", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"11"}, fri:{am:"0",pm:"0"} }, transitionRoom: "4", transitionAge: "3", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "4", name: "Toddler Room 1", ageGroup: "4", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "5", transitionAge: "4", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "5", name: "Pre-Montessori Room 1", ageGroup: "5", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "6", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "6", name: "Montessori Room 1", ageGroup: "6", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "7", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "7", name: "After School", ageGroup: "7", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "1", transitionAge: "7", ecceCapitations: "", selected: false, assignedStaff:[]}
    ];

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
    /****************** //fake data ********************* */

    this.dateChange();
  }

  ngOnInit() {
     this.selectedChild = {id:"1",name:"", age:"", birthdate: "", officialStartdate:"",roomStartdate:"",roomEnddate:"", paperwork:false, assignedRoom:"0", movetoRoom: "0", movetoDate: "", parentName: "parent", parentEmail:"parent@mail.com", deposit:false,
                                  assignedState :{ mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } };
  }

  ngOnDestroy() {
  }

  //select date tab
  selectDate(id: string){
    this.selectedDateID = id;
    this.selectedDateFullName = "View All";
    var selectedYear = "2017";
    var selectedMonth = 1;

    this.months.forEach(month => {
      month.selected = false;
      if( month.id == id ){
        month.selected = true;
        this.selectedDateFullName = month.fullname;
        selectedYear = month.year;
        selectedMonth = month.month;
      }
    });
    
    if( this.selectedDateID == "0" ){
      this.waitingChild = this.pureStore;
    } else {
      this.waitingChild = this.pureStore.filter(child => {
        var officialDate = new Date(child.officialStartdate);
        var year = officialDate.getFullYear();
        var month = officialDate.getMonth() + 1;
        if( month == selectedMonth ){
          return true;
        }else{
          return false;
        }
      });
    }
  }

  //select month tab
  selectMonth(id: string){
    this.months.forEach(month => {
      month.selected = false;
      if( month.id == id ){
        month.selected = true;
      }
    });
  }

  //get room name by room.id
  getRoomNameById(id:string):string {
    let _room =  this.rooms.find(room => room.id === id);
    return id == "0" ? "NOT IN" : _room.name;
  }
  //get deposit name by deposit.id
  getDepositNameById(id:string):string {
    let _deposit =  this.deposit.find(deposit => deposit.id === id);
    return id == "0" ? "NOT IN" : _deposit.name;
  }
  //get capacity number
  getRoomCapacityByRoomId( week:string, apm:string ):string {
    let _room = this.rooms.find(room => room.id === this.selectedDateID);
    let _capacity = "0";
    switch( week ){
      case "mon":
          if( apm == "am" ){
            _capacity = _room.capacity.mon.am;
          } else {
            _capacity = _room.capacity.mon.pm;
          }
        break;
      case "tue":
          if( apm == "am" ){
            _capacity = _room.capacity.tue.am;
          } else {
            _capacity = _room.capacity.tue.pm;
          }
        break;
      case "wed":
          if( apm == "am" ){
            _capacity = _room.capacity.wed.am;
          } else {
            _capacity = _room.capacity.wed.pm;
          }
        break;
      case "thu":
          if( apm == "am" ){
            _capacity = _room.capacity.thu.am;
          } else {
            _capacity = _room.capacity.thu.pm;
          }
        break;
      case "fri":
          if( apm == "am" ){
            _capacity = _room.capacity.fri.am;
          } else {
            _capacity = _room.capacity.fri.pm;
          }
        break;
    }
    return _capacity;
  }

  //Click row waiting child
  selectWaitChild(child: Child){
    this.selectedChild = child;
    this.showOccupancyModal = true;
  }

  //Click a row in the room list
  selectRoomChild(child: Child){
    this.selectedChild = child;
    this.showChildModal = true;
  }

  //move to room
  moveFromWaitRoomToRoom( child: Child ){
    let wChild = this.waitingChild.find( wChild => wChild.id == child.id);
    this.waitingChild.splice(this.waitingChild.indexOf(wChild), 1);
    child.id = (this.childs.length+1).toString();
    //this.childs.push( child );
    //this.pureStore.push( child );    
  }

  modalClosed() {
    this.showOccupancyModal = false;
    this.showChildModal = false;
  }

  prevMonth() {
    this.currentDate.subtract(1, 'month');
    this.dateChange();
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.dateChange();
  }

  prevWeek() {
    this.currentDate.subtract(1, 'week');
    this.dateChange();
  }

  nextWeek() {
    this.currentDate.add(1, 'week');
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

}

