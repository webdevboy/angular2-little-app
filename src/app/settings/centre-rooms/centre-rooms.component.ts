import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TRoom } from '../../shared/models/general.model';
import { RoomsManagerService } from '../../shared/rooms-manager.service';
import { TFlexOptions } from '../../shared/models/general.model';
import { Subscription } from 'rxjs';

// Review: Age groups with spaces

@Component({
  selector: 'app-centre-rooms',
  templateUrl: './centre-rooms.component.html',
  styleUrls: ['./centre-rooms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentreRoomsComponent implements OnInit, OnDestroy {
  public rooms: TRoom[] = [];
  public pureStore: TRoom[] = [];
  public showModal: boolean = false;
  public selectedRoom: TRoom;
  public deleteMessage: string;
  public confirmDelete: any;
  public tableOptions: TFlexOptions;
  public loading: boolean = true;
  private sub: Subscription;

  constructor(private roomsManager: RoomsManagerService) {
    this.tableOptions = {
      tooltips: [
        {
          value: 'name',
          caption: 'Room name',
          className: 'name-col'
        },
        {
          value: 'ageGroup',
          caption: 'Age Group',
          sortTransform: (ageGroup) => {
            if(ageGroup) {
              let ages = ageGroup.split('-');
              let fromIndex = this.roomsManager.AGES_FROM.indexOf(ages[0]);
              let toIndex = this.roomsManager.AGES_TO.indexOf(ages[1]);
              let delta = fromIndex + toIndex;
              return delta;
            }
            return 0;
          }
        },
        {
          value: 'capacity',
          caption: 'Capacity'
        },
        {
          value: 'Remove',
          inactive: true
        }
      ]
    }
  }

  ngOnInit() {
    this.sub = this.roomsManager.loadRooms()
      .map(res => res.json()).subscribe(rooms => {
        this.rooms = rooms;
        this.pureStore = [...rooms];
        this.loading = false;
      }, e => {
        this.loading = false;
        console.log(e);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editRoom(room: TRoom) {
    this.selectedRoom = room;
    this.showModal = true;
  }

  deleteRoom(event, room: TRoom) {
    event.stopPropagation();
    this.deleteMessage = 'Are you sure you want to delete the room "' + room.name + '" ?';
    this.confirmDelete = room;
  }

  confirmDeleteRoom(confirm: boolean) {
    if (confirm === true) {
      this.roomsManager.removeRoom(this.confirmDelete);
    }
    this.confirmDelete = null;
  }

  modalClosed() {
    this.showModal = false;
    this.selectedRoom = null;
  }

  handleFilter(filter: string) {
    let filterValue = filter.toLowerCase();
    this.rooms = this.pureStore.filter((room: TRoom) => {
      let roomName = room.name.toLowerCase();
      return roomName.indexOf(filterValue) !== -1;
    });
  }
}
