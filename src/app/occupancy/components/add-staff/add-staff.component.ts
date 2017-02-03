import { Component, Output, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { OccupancyService } from '../../occupancy.service';
import { occupancyModalAnimations } from '../occupancy-modal/occupancy-modal.animations';

import { TRoom } from '../../../shared/models/general.model';
import { Staff, QualificationType, AgeGroup, Rooms } from '../../occupancy.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss', '../../occupancy.component.scss'],
  animations: [...occupancyModalAnimations]
})
export class AddStaffComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter();

  @Input() title: string = "";
 
  @Input() staff: Staff;
  @Input() rooms: Rooms[] = [];
  @Input() qualification = [];

  @Input() showOccupancyModal: boolean = false;
  @Input() isEdit: boolean = false;

  ageGroup: AgeGroup[] = [];
  errorMessage: string = "";
  saving: boolean = false;

  constructor( private OccupancyService: OccupancyService, ) {
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
  }

  ngOnInit() {
    this.staff = new Staff({id: "", name:"", qualification: "0", startdate: "", enddate: "", assignedRoom : { mon:{am:"0",pm:"0"}, tue:{am:"0",pm:"0"}, wed:{am:"0",pm:"0"}, thu:{am:"0",pm:"0"}, fri:{am:"0",pm:"0"} }});
  }

  ngOnChanges() {
    this.errorMessage = "";
  }

  destroy() {
    this.closeModal.emit('close');
  }

  //save staff
  saveStaff(){
    if( this.isValid() && !this.saving ) {
      this.saving = true;
      if(this.isEdit) {

        /**************************
         * update fake data
         */
        this.OccupancyService.updateStaff(this.staff);
        this.saving = false;
        this.destroy();
        /************************** */
      
      } else {

        /**************************
         * add fake data
         */
        this.OccupancyService.addStaff(this.staff);
        this.saving = false;
        this.destroy();
        /************************** */
      }

      //a staff assign to room////////////////////////////////////////////////////////////////////////////
      this.rooms.forEach( (room, index) => {
        let _staff = room.assignedStaff.find( staff => staff.id === this.staff.id );
        //if already exist, delete in assignedStaff.
        if( _staff != undefined ){
          room.assignedStaff.splice(room.assignedStaff.indexOf(_staff), 1);
        }
        //after check, assign to room
        if( this.checkRoom( this.staff, room.id ) ){
          this.rooms[index].assignedStaff.push( this.staff );
        }

        //count capacity  
        let childCountByRoomID: number = this.ageGroup.find( age => age.id === room.ageGroup ).childNo;
        if( room.assignedStaff.length > 0 ){
          let mon_am=0; let mon_pm=0; let tue_am=0; let tue_pm=0; let wed_am=0;
          let wed_pm=0; let thu_am=0; let thu_pm=0; let fri_am=0; let fri_pm=0;

          room.assignedStaff.forEach( staff => {
            if( staff.assignedRoom.mon.am == room.id ) mon_am++;
            if( staff.assignedRoom.mon.pm == room.id ) mon_pm++;
            if( staff.assignedRoom.tue.am == room.id ) tue_am++;
            if( staff.assignedRoom.tue.pm == room.id ) tue_pm++;
            if( staff.assignedRoom.wed.am == room.id ) wed_am++;
            if( staff.assignedRoom.wed.pm == room.id ) wed_pm++;
            if( staff.assignedRoom.thu.am == room.id ) thu_am++;
            if( staff.assignedRoom.thu.pm == room.id ) thu_pm++;
            if( staff.assignedRoom.fri.am == room.id ) fri_am++;
            if( staff.assignedRoom.fri.pm == room.id ) fri_pm++;
          });

          this.rooms[index].capacity.mon.am = (mon_am*childCountByRoomID).toString();
          this.rooms[index].capacity.mon.pm = (mon_pm*childCountByRoomID).toString();
          this.rooms[index].capacity.tue.am = (tue_am*childCountByRoomID).toString();
          this.rooms[index].capacity.tue.pm = (tue_pm*childCountByRoomID).toString();
          this.rooms[index].capacity.wed.am = (wed_am*childCountByRoomID).toString();
          this.rooms[index].capacity.wed.pm = (wed_pm*childCountByRoomID).toString();
          this.rooms[index].capacity.thu.am = (thu_am*childCountByRoomID).toString();
          this.rooms[index].capacity.thu.pm = (thu_pm*childCountByRoomID).toString();
          this.rooms[index].capacity.fri.am = (fri_am*childCountByRoomID).toString();
          this.rooms[index].capacity.fri.pm = (fri_pm*childCountByRoomID).toString();
        }else{
          this.rooms[index].capacity.mon.am = "0";
          this.rooms[index].capacity.mon.pm = "0";
          this.rooms[index].capacity.tue.am = "0";
          this.rooms[index].capacity.tue.pm = "0";
          this.rooms[index].capacity.wed.am = "0";
          this.rooms[index].capacity.wed.pm = "0";
          this.rooms[index].capacity.thu.am = "0";
          this.rooms[index].capacity.thu.pm = "0";
          this.rooms[index].capacity.fri.am = "0";
          this.rooms[index].capacity.fri.pm = "0";
        }
             
      });
      ////////////////////////////////////////////////////////////////////////////////////////////////////
    } else {
        this.errorMessage = 'All Required. Please!';
    }
  }

  //check Staff existing in the room
  checkRoom( staff: Staff, id: string ){
    let exist: boolean = false;
    if( staff.assignedRoom.mon.am == id ||
        staff.assignedRoom.mon.pm == id ||
        staff.assignedRoom.tue.am == id ||
        staff.assignedRoom.tue.pm == id ||
        staff.assignedRoom.wed.am == id ||
        staff.assignedRoom.wed.pm == id ||
        staff.assignedRoom.thu.am == id ||
        staff.assignedRoom.thu.pm == id ||
        staff.assignedRoom.fri.am == id ||
        staff.assignedRoom.fri.pm == id
    ){
      exist = true;
    }
    return exist;
  }

  isValid() {
    return this.staff.name && this.staff.startdate;
  }

}
