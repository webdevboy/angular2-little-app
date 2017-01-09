import { Component, Output, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { occupancyModalAnimations } from '../occupancy-modal/occupancy-modal.animations';

import { Child, Rooms } from '../../occupancy.model';

@Component({
  selector: 'app-remove-waiting-child',
  templateUrl: './remove-waiting-child.component.html',
  styleUrls: ['./remove-waiting-child.component.scss', '../../occupancy.component.scss'],
  animations: [...occupancyModalAnimations]
})
export class RemoveWaitingChildComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter();
  @Output() moveFromWaitRoomToRoom = new EventEmitter();

  @Input() child: Child;
  @Input() rooms: Rooms[] = [];
  @Input() showOccupancyModal: boolean = false;

  title: string = "";
  errorMessage: string = "";

  deposit: any = [];

  constructor() {
    this.deposit = [
      {id: "1", name: "PAID"},
      {id: "2", name: "NOT PAID"},
      {id: "3", name: "ENQUIRE ONLY"}
    ];
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.title = this.child.name;
    this.errorMessage = "";
  }

  destroy() {
    this.closeModal.emit('close');
  }

  //get deposit name by deposit.id
  getDepositNameById(id:string):string {
    let _deposit =  this.deposit.find(deposit => deposit.id === id);
    return id == "0" ? "NOT IN" : _deposit.name;
  }

  moveFromWaitRoom(){
    this.moveFromWaitRoomToRoom.emit( this.child );
  }

  moveToRoom(){
    if( this.child.deposit != "1" ){
      this.errorMessage = "Not PAID";
    }else{
      if( this.isValid() ){
        this.moveFromWaitRoom();
        this.destroy();
      }else{
        this.errorMessage = "Required. Please!";
      }
    }
  }

  isValid() {
    return this.child.assignedRoom && this.child.roomStartdate;
  }

  
  roomId: number = 1;

}
