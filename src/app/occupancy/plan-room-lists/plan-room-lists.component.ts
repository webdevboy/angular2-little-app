import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Staff, QualificationType, AgeGroup, Rooms, Child } from '../occupancy.model';

@Component({
  selector: 'app-plan-room-lists',
  templateUrl: './plan-room-lists.component.html',
  styleUrls: ['./plan-room-lists.component.scss','../occupancy.component.scss']
})
export class PlanRoomListsComponent implements OnInit, OnDestroy {

  rooms: Rooms[];
  childs: Child[] = [];
  pureStore: Child[] = [];
  deposit: any = [];
  selectedChild: Child;
  months: any = [];

  week: any[] = [];
  currentDate: moment.Moment = moment().startOf('isoWeek');
  selectedMonth: string = "JANUARY";
  
  showOccupancyModal: boolean = false;
  showChildModal: boolean = false;

  title: string = "";
  selectedRoomID: string = "1";
  selectedRoom: Rooms;
  selectRoomPopup: boolean = false;

  constructor() {
    /******************** fake data ********************* */
    this.deposit = [
      {id: "1", name: "PAID"},
      {id: "2", name: "NOT PAID"},
      {id: "3", name: "ENQUIRE ONLY"}
    ];

    this.childs = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2", movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com",deposit:true,assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"2",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "4", name:"John Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent", parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "5", name:"Srah Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } }
    ];

    this.pureStore = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2", movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com",deposit:true,assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"2",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "4", name:"John Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent", parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "5", name:"Srah Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:true, assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } }
    ];

    this.rooms = [
      {id: "1", name: "Baby Room 1", ageGroup: "1", capacity: { mon:{am:"3",pm:"0"}, tue:{am:"0",pm:"3"}, wed:{am:"3",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"3",pm:"0"} }, transitionRoom: "2", transitionAge: "1", ecceCapitations: "", selected: true, assignedStaff:[]},
      {id: "2", name: "Baby Room 2", ageGroup: "2", capacity: { mon:{am:"0",pm:"5"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"5"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"5"} }, transitionRoom: "3", transitionAge: "2", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "3", name: "Wobbler Room 1", ageGroup: "3", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"11"}, fri:{am:"0",pm:"0"} }, transitionRoom: "4", transitionAge: "3", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "4", name: "Toddler Room 1", ageGroup: "4", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "5", transitionAge: "4", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "5", name: "Pre-Montessori Room 1", ageGroup: "5", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "6", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "6", name: "Montessori Room 1", ageGroup: "6", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "7", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "7", name: "After School", ageGroup: "7", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "1", transitionAge: "7", ecceCapitations: "", selected: false, assignedStaff:[]}
    ];

    this.months = [
      {id: "1", name: "JAN", fullname:"JANUARY", selected: true, status: "0"},
      {id: "2", name: "FEB", fullname:"FEBRUARY", selected: false, status: "0"},
      {id: "3", name: "MAR", fullname:"MARCH", selected: false, status: "1"},
      {id: "4", name: "APR", fullname:"APRIL", selected: false, status: "0"},
      {id: "5", name: "MAY", fullname:"MAY", selected: false, status: "0"},
      {id: "6", name: "JUN", fullname:"JUNE", selected: false, status: "2"},
      {id: "7", name: "JUL", fullname:"JULY", selected: false, status: "1"},
      {id: "8", name: "AUG", fullname:"AUGUST", selected: false, status: "0"},
      {id: "9", name: "SEP", fullname:"SEPTEMBER", selected: false, status: "0"},
      {id: "10", name: "OCT", fullname:"OCTOBER", selected: false, status: "1"},
      {id: "11", name: "NOV", fullname:"NOVEMBER", selected: false, status: "0"},
      {id: "12", name: "DEC", fullname:"DECEMBER", selected: false, status: "2"}
    ];

    /****************** //fake data ********************* */

    this.dateChange();
  }

  ngOnInit() {
    this.selectRoom("1");

    this.selectedChild = {id:"1",name:"", age:"", birthdate: "", officialStartdate:"",roomStartdate:"",roomEnddate:"", paperwork:false, assignedRoom:"0", movetoRoom: "0", movetoDate: "", parentName: "parent", parentEmail:"parent@mail.com", deposit:true,
                                  assignedState :{ mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } };
  }

  ngOnDestroy() {
  }

  //select room tab
  selectRoom(id: string){
    this.selectedRoomID = id;
    this.rooms.forEach(room => {
      room.selected = false;
      if( room.id == id ){
        this.selectedRoom = room;
        room.selected = true;
      }
    });

    this.childs = this.pureStore.filter(child => {
      if( child.assignedRoom == id ){
        return true;
      }else{
        return false;
      }
    });
  }

  //select month tab
  selectMonth(id: string){
    this.months.forEach(month => {
      month.selected = false;
      if( month.id == id ){
        this.selectedMonth = month.fullname;
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
    let _room = this.rooms.find(room => room.id === this.selectedRoomID);
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

  //Click a row in the room list
  selectRoomChild(child: Child){
    this.selectedChild = child;
    this.showChildModal = true;
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
    let currentWeek = { start: + startOfWeek.format('x'), end: 0 };
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
