import { Component, OnInit, OnDestroy } from '@angular/core';

import { Staff, AgeGroup, Rooms, Child, DashBoardRoomInfo, RoomInfo } from '../occupancy.model';

@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.scss', '../occupancy.component.scss']
})
export class PlanDashboardComponent implements OnInit {
  rooms: Rooms[];
  childs: Child[] = [];
  staffs: Staff[] = [];
  ageGroup: AgeGroup [] = [];
  dashboardData: DashBoardRoomInfo[] = [];

  selectedRoomIndex: number;
  selectedDateIndex: number;
  selectedRoomID: string;
  selectedRoomInfo: RoomInfo;

  dates = ["JAN1","FEB2","MAR3","APR4","MAY5","JUN6","JUL7","AUG8","SEP9"];

  dateTabs = [
    {name: "Week", active: false},
    {name: "Month", active: true},
    {name: "3-Month", active: false}
  ];

  constructor() { 

    /******************** fake data ********************* */
    this.ageGroup =[
        {id:"1", serviceType:0, name:"0-1 years", adultNo:1, childNo:3},
        {id:"2", serviceType:0, name:"1-2.5 years", adultNo:1, childNo:5},
        {id:"3", serviceType:0, name:"2.5-6 years", adultNo:1, childNo:11},
        {id:"4", serviceType:1, name:"0-1 years", adultNo:1, childNo:3},
        {id:"5", serviceType:1, name:"1-2 years", adultNo:1, childNo:5},
        {id:"6", serviceType:1, name:"2-3 years", adultNo:1, childNo:6},
        {id:"7", serviceType:1, name:"3-6 years", adultNo:1, childNo:8}
    ];

    this.staffs = [
      {id: "1", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} }},
      {id: "2", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} }}
    ];


    this.childs = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:"1", assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"1",movetoRoom:"2", movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com",deposit:"1",assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"2",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:"1", assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "4", name:"John Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent", parentEmail:"parent@mail.com", deposit:"1", assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } },
      {id: "5", name:"Srah Doherty", age: "2yr 5m", birthdate:"2014-12-22",officialStartdate:"2016-12-21",roomStartdate:"2016-12-21",roomEnddate:"",paperwork:true,assignedRoom:"3",movetoRoom:"2",movetoDate:"2016-12-22",parentName:"parent",parentEmail:"parent@mail.com", deposit:"1", assignedState : 
                                                    { mon:{am:true,pm:true}, tue:{am:true,pm:false}, wed:{am:true,pm:false}, thu:{am:true,pm:true}, fri:{am:false,pm:false} } }
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

    this.dashboardData = [
      {id:"1",roomId:"1",capacity:10,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"-3",pm:"1"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"4",pm:"2"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"4"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"5",pm:"1"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"3",pm:"2"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"-3",pm:"3"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"6",pm:"5"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"1",pm:"6"},active:false}
                                                                  ]},
      {id:"2",roomId:"2",capacity:6,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"1",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"3",pm:"2"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"6",pm:"5"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"-7",pm:"7"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"8",pm:"9"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"9",pm:"8"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"1",pm:"7"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"2"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"1",pm:"4"},active:false}
                                                                  ]},
      {id:"3",roomId:"3",capacity:10,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"-2",pm:"5"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false}
                                                                  ]},
      {id:"4",roomId:"4",capacity:10,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"-5"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false}
                                                                  ]},
      {id:"5",roomId:"5",capacity:10,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"-5"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false}
                                                                  ]},
      {id:"6",roomId:"6",capacity:10,accordionState:false,roomInfo:[
                                                                      {id:"1",mdate:"2017-01",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"2",mdate:"2017-02",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"3",mdate:"2017-03",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"4",mdate:"2017-04",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"5",mdate:"2017-05",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"6",mdate:"2017-06",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"7",mdate:"2017-07",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"8",mdate:"2017-08",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false},
                                                                      {id:"9",mdate:"2017-09",personInfo:{staff:this.staffs,child:this.childs},available:{am:"2",pm:"5"},active:false}
                                                                  ]},
    ];
    /****************** //fake data ********************* */
  }

  ngOnInit() {
  }

  selDatePicker(idx: number){
    this.dateTabs.forEach(tab => {
      tab.active = false;
    });

    this.dateTabs[idx].active = true;
  }

  //get room name by room.id
  getRoomNameById(id:string):string {
    let _room =  this.rooms.find(room => room.id === id);
    return id == "0" ? "NOT IN" : _room.name;
  }
  
  //select session
  selectCell(idx: number, jdx: number) {
    if( this.dashboardData[idx].accordionState == true && this.selectedDateIndex == jdx ){
      this.dashboardData[idx].accordionState = false;
      this.dashboardData[idx].roomInfo[jdx].active = false;
    }else{
      this.removeAccordion();
      this.selectedRoomIndex = idx;
      this.selectedDateIndex = jdx;
      this.selectedRoomInfo                         = this.dashboardData[idx].roomInfo[jdx];
      this.selectedRoomID                           = this.dashboardData[idx].roomId;
      this.dashboardData[idx].accordionState        = true;
      this.dashboardData[idx].roomInfo[jdx].active  = true;
    }
  }

  removeAccordion(){
    this.dashboardData.forEach( _room => {
      _room.accordionState = false;
      _room.roomInfo.forEach(list => {
        list.active = false;
      });
    });
  }

}
