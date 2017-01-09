import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  waitingChild: Child[] = [];
  deposit: any = [];
  selectedChild: Child;

  showOccupancyModal: boolean = false;

  title: string = "";
  selectedRoomID: string = "0";

  constructor() {
    /******************** fake data ********************* */
    this.deposit = [
      {id: "1", name: "PAID"},
      {id: "2", name: "NOT PAID"},
      {id: "3", name: "ENQUIRE ONLY"}
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

    this.pureStore = [
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

    this.waitingChild = [
      {id: "1", name:"Jane Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2016-12-21",roomStartdate:"",roomEnddate:"",paperwork:true,assignedRoom:"1", movetoRoom: "2", movetoDate: "2016-12-22", parentName: "parent", parentEmail:"parent@mail.com", deposit:"1", assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "2", name:"Mecel Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate:"2016-12-21",roomStartdate:"",roomEnddate:"",paperwork:false,assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "parent", parentEmail:"parent@mail.com", deposit:"2", assignedState : 
                                                    { mon:{am:false,pm:false}, tue:{am:false,pm:false}, wed:{am:false,pm:false}, thu:{am:false,pm:false}, fri:{am:false,pm:false} } },
      {id: "3", name:"Mike Doherty", age: "2yr 5m", birthdate: "2014-12-22", officialStartdate: "2016-12-21", roomStartdate: "",roomEnddate:"",paperwork:true, assignedRoom:"1",movetoRoom:"2",movetoDate: "2016-12-22", parentName: "parent", parentEmail:"parent@mail.com", deposit:"1", assignedState : 
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
    /****************** //fake data ********************* */
  }

  ngOnInit() {
     this.selectedChild = {id:"1",name:"", age:"", birthdate: "", officialStartdate:"",roomStartdate:"",roomEnddate:"", paperwork:false, assignedRoom:"0", movetoRoom: "0", movetoDate: "", parentName: "parent", parentEmail:"parent@mail.com", deposit:"1",
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

  //Click row waiting child
  selectWaitChild(child: Child){
    this.selectedChild = child;
    this.showOccupancyModal = true;
  }

  //move to room
  moveFromWaitRoomToRoom( child: Child ){
    let wChild = this.waitingChild.find( wChild => wChild.id == child.id);
    this.waitingChild.splice(this.waitingChild.indexOf(wChild), 1);
    child.id = (this.childs.length+1).toString();
    this.childs.push( child );
    this.pureStore.push( child );    
  }

  modalClosed() {
    this.showOccupancyModal = false;
  }

}
