import { Component, Output, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { Staff, Rooms, Child, DashBoardRoomInfo, RoomInfo } from '../../occupancy.model';

@Component({
  selector: 'app-room-info-accordian',
  templateUrl: './room-info-accordian.component.html',
  styleUrls: ['./room-info-accordian.component.scss', '../../occupancy.component.scss']
})
export class RoomInfoAccordianComponent implements OnInit, OnChanges {
  @Input() roomInfo: RoomInfo;
  @Input() roomID: string;

  rooms: Rooms[];
  childStoreAM: Child[];
  childStorePM: Child[];
  staffStore: Staff[];
  selectedChild: Child;

  initSelectedRoomID: string = "0";
  intiSelectedDate: string = "0";
  
  constructor() { 
    this.rooms = [
      {id: "1", name: "Baby Room 1", ageGroup: "1", capacity: { mon:{am:"3",pm:"0"}, tue:{am:"0",pm:"3"}, wed:{am:"3",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"3",pm:"0"} }, transitionRoom: "2", transitionAge: "1", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "2", name: "Baby Room 2", ageGroup: "2", capacity: { mon:{am:"0",pm:"5"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"5"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"5"} }, transitionRoom: "3", transitionAge: "2", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "3", name: "Wobbler Room 1", ageGroup: "3", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"11"}, fri:{am:"0",pm:"0"} }, transitionRoom: "4", transitionAge: "3", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "4", name: "Toddler Room 1", ageGroup: "4", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "5", transitionAge: "4", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "5", name: "Pre-Montessori Room 1", ageGroup: "5", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "6", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "6", name: "Montessori Room 1", ageGroup: "6", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "7", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "7", name: "After School", ageGroup: "7", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "1", transitionAge: "7", ecceCapitations: "", selected: false, assignedStaff:[]}
    ];
  }

  ngOnInit() {
    this.roomInfo = {id:"",mdate:"",personInfo:{staff:[],child:[]},available:{am:"0",pm:"0"},active:false};
    this.roomID = "1";
  }
  ngOnChanges(){
    if( (this.initSelectedRoomID !== this.roomID || this.intiSelectedDate !== this.roomInfo.mdate) && this.roomInfo != undefined ){
      this.selectWeekPicker(0);
    }
  }

  showOccupancyModal: boolean = false;
  title: string = "07/ 07/ 2015";

  weekTabs = [
    {name: "MON", fullname: "Monday", active: true},
    {name: "TUE", fullname: "Tuesday", active: false},
    {name: "WED", fullname: "Wednesday", active: false},
    {name: "THU", fullname: "Thursday", active: false},
    {name: "FRI", fullname: "Friday", active: false}
  ];

  //get room name by room.id
  getRoomNameById(id:string):string {
    let _room =  this.rooms.find(room => room.id === id);
    return id == "0" ? "NOT IN" : _room.name;
  }

  staff: any[] = [];
  selectedWeeKFullName: string = "Monday";
  //filter data whenselect weekpicker
  selectWeekPicker(idx: number){
     this.weekTabs.forEach(tab => {
      tab.active = false;
    });
    this.weekTabs[idx].active = true;
    this.selectedWeeKFullName =  this.weekTabs[idx].fullname;
    this.staff = [];

    if( this.weekTabs[idx].name == "MON" ){
      this.getMondayResult();
    }else if( this.weekTabs[idx].name == "TUE" ){
      this.getTuesdayResult();
    }else if( this.weekTabs[idx].name == "WED" ){
      this.getWednesdayResult();
    }else if( this.weekTabs[idx].name == "THU" ){
      this.getThursdayResult();
    }else{
      this.getFridayResult();
    }
  }

  getMondayResult(){
    if( this.roomInfo.personInfo.child.length > 0 ){
        this.childStoreAM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.mon.am;
        });
        this.childStorePM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.mon.pm;
        });
      }
      if( this.roomInfo.personInfo.staff.length > 0 ){
        this.staffStore = this.roomInfo.personInfo.staff.filter(_staff => {
          return _staff.assignedRoom.mon.am === this.roomID || _staff.assignedRoom.mon.am === this.roomID; 
        });

        this.staffStore.forEach( _staff => {
          this.staff.push({id:_staff.id, name:_staff.name, am:_staff.assignedRoom.mon.am, pm:_staff.assignedRoom.mon.pm});
        });
      }
  }
  getTuesdayResult(){
      if( this.roomInfo.personInfo.child.length > 0 ){
        this.childStoreAM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.tue.am;
        });
        this.childStorePM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.tue.pm;
        });
      }
      if( this.roomInfo.personInfo.staff.length > 0 ){
        this.staffStore = this.roomInfo.personInfo.staff.filter(_staff => {
          return _staff.assignedRoom.tue.am === this.roomID || _staff.assignedRoom.tue.am === this.roomID; 
        });

        this.staffStore.forEach( _staff => {
          this.staff.push({id:_staff.id, name:_staff.name, am:_staff.assignedRoom.tue.am, pm:_staff.assignedRoom.tue.pm});
        });
      }
  }
  getWednesdayResult(){
      if( this.roomInfo.personInfo.child.length > 0 ){
        this.childStoreAM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.wed.am;
        });
        this.childStorePM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.wed.pm;
        });
      }
      if( this.roomInfo.personInfo.staff.length > 0 ){
        this.staffStore = this.roomInfo.personInfo.staff.filter(_staff => {
          return _staff.assignedRoom.wed.am === this.roomID || _staff.assignedRoom.wed.am === this.roomID; 
        });

        this.staffStore.forEach( _staff => {
          this.staff.push({id:_staff.id, name:_staff.name, am:_staff.assignedRoom.wed.am, pm:_staff.assignedRoom.wed.pm});
        });
      }
  }
  getThursdayResult(){
      if( this.roomInfo.personInfo.child.length > 0 ){
        this.childStoreAM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.thu.am;
        });
        this.childStorePM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.thu.pm;
        });
      }
      if( this.roomInfo.personInfo.staff.length > 0 ){
        this.staffStore = this.roomInfo.personInfo.staff.filter(_staff => {
          return _staff.assignedRoom.thu.am === this.roomID || _staff.assignedRoom.thu.am === this.roomID; 
        });

        this.staffStore.forEach( _staff => {
          this.staff.push({id:_staff.id, name:_staff.name, am:_staff.assignedRoom.thu.am, pm:_staff.assignedRoom.thu.pm});
        });
      }
  }
  getFridayResult(){
      if( this.roomInfo.personInfo.child.length > 0 ){
        this.childStoreAM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.fri.am;
        });
        this.childStorePM = this.roomInfo.personInfo.child.filter(_child => {
          return _child.assignedRoom === this.roomID && _child.assignedState.fri.pm;
        });
      }
      if( this.roomInfo.personInfo.staff.length > 0 ){
        this.staffStore = this.roomInfo.personInfo.staff.filter(_staff => {
          return _staff.assignedRoom.fri.am === this.roomID || _staff.assignedRoom.fri.am === this.roomID; 
        });

        this.staffStore.forEach( _staff => {
          this.staff.push({id:_staff.id, name:_staff.name, am:_staff.assignedRoom.fri.am, pm:_staff.assignedRoom.fri.pm});
        });
      }
  }

  selectChild( child: Child ){
    this.selectedChild = child;
    this.showOccupancyModal=true;
  }

  modalClosed() {
    this.showOccupancyModal = false;
  }

}
