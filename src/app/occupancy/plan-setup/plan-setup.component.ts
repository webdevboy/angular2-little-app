import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { OccupancyService } from '../occupancy.service';
import { RoomsManagerService } from '../../shared/rooms-manager.service';

import { TRoom } from '../../shared/models/general.model';
import { Staff, QualificationType, AgeGroup, Rooms } from '../occupancy.model';

@Component({
  selector: 'app-plan-setup',
  templateUrl: './plan-setup.component.html',
  styleUrls: ['./plan-setup.component.scss', '../occupancy.component.scss'],
  providers: [OccupancyService]
})

export class PlanSetupComponent implements OnInit, OnDestroy {
  sub: Subscription;
  rooms: Rooms[];
  staffs: Staff[] = [];
  qualification: QualificationType[] = [];
  ageGroup: AgeGroup[] = [];
  selectedStaff: Staff;
  selectedRoom: Rooms;
  
  showOccupancyModal: boolean = false;
  isEdit: boolean = false;

  maxID: number = 0;
  title: string = "Add Staff";
  selectedRoomID: string = "1";
  
  constructor(
    private OccupancyService: OccupancyService
    // private OccupancyService: OccupancyService,
    // private roomManager: RoomsManagerService
  ) { 
    const staffs$ = this.OccupancyService.store$.subscribe(staffs => {
      this.staffs = staffs;
    });
    // const rooms$ = this.roomManager.store$.subscribe(rooms => {
    //   this.rooms = rooms;
    // });

    this.sub = staffs$;
    // this.sub.add(rooms$);

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

    this.rooms = [
      {id: "1", name: "Baby Room 1", ageGroup: "1", capacity: { mon:{am:"3",pm:"0"}, tue:{am:"0",pm:"3"}, wed:{am:"3",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"3",pm:"0"} }, transitionRoom: "2", transitionAge: "1", ecceCapitations: "", selected: false,
                                                    assignedStaff:[{id: "1", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} } }]},
      {id: "2", name: "Baby Room 2", ageGroup: "2", capacity: { mon:{am:"0",pm:"5"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"5"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"5"} }, transitionRoom: "3", transitionAge: "2", ecceCapitations: "", selected: false,
                                                    assignedStaff:[{id: "1", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} } }]},
      {id: "3", name: "Wobbler Room 1", ageGroup: "3", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"11"}, fri:{am:"0",pm:"0"} }, transitionRoom: "4", transitionAge: "3", ecceCapitations: "", selected: false, 
                                                    assignedStaff:[{id: "1", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} } }]},
      {id: "4", name: "Toddler Room 1", ageGroup: "4", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "5", transitionAge: "4", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "5", name: "Pre-Montessori Room 1", ageGroup: "5", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "6", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "6", name: "Montessori Room 1", ageGroup: "6", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "7", transitionAge: "5", ecceCapitations: "", selected: false, assignedStaff:[]},
      {id: "7", name: "After School", ageGroup: "7", capacity: { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }, transitionRoom: "1", transitionAge: "7", ecceCapitations: "", selected: false, assignedStaff:[]}
    ];

    this.qualification = [
      {id:"1", name: "FETAC 1"},
      {id:"2", name: "FETAC 2"},
      {id:"3", name: "FETAC 3"},
      {id:"4", name: "FETAC 4"},
      {id:"5", name: "FETAC 5"}
    ];
    /****************** //fake data ********************* */
  }

  ngOnInit() {
    //This table will show which rooms the staff member is assigned to most.
    let maxLen = 0;
    this.rooms.forEach(room => {
      if( maxLen < room.assignedStaff.length ){
        maxLen = room.assignedStaff.length;
        this.selectedRoomID = room.id;
      }
    });

    let _room = this.rooms.find( room => room.id === this.selectedRoomID );
    this.rooms.find( room => room.id === this.selectedRoomID ).selected = true;
    this.selectedRoom = _room;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //get room name by room.id
  getRoomNameById(id:string):string {
    let _room =  this.rooms.find(room => room.id === id);
    return id == "0" ? "NOT IN" : _room.name;
  }

  //get qualification name by room.id
  getQualificationNameById(id:string):string {
    let _qualification =  this.qualification.find(qualification => qualification.id === id);
    return id == "0" ? "NOT" : _qualification.name;
  }

  //select room tab
  selectRoom(id: string){
    this.selectedRoom = null;
    this.selectedRoomID = id;
    this.rooms.find(_room => _room.selected == true).selected = false;
    this.selectedRoom = this.rooms.find(_room => _room.id === id);
    this.selectedRoom.selected = true;    
  }

  //Click a row for edit or Add button for add new staff
  controlStaffs(isEdit:boolean, staff: Staff){
    this.isEdit = isEdit;
    if( !this.isEdit ){
      this.title = "Add Staff";
      this.maxID = this.staffs.length;
      this.selectedStaff = new Staff({id: (this.maxID+1), name:"", qualification: "0", startdate: "", enddate: "", assignedRoom : { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }});
    }
    else{
      this.selectedStaff = staff;
      this.title = staff.name;
    }
    this.showOccupancyModal = true;
  }

  modalClosed() {
    this.showOccupancyModal = false;
  }
}
