import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { RoomsManagerService } from '../../../shared/rooms-manager.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit, OnChanges {
  @Output('closeModal') public closeModal = new EventEmitter();
  @Input() public room;
  public name: string;
  public ageFromAvailable: string[];
  public ageToAvailable: string[];
  public ageFrom: any;
  public ageTo: any;
  public ageGroup: string;
  public capacity: string;
  public ecceCapitations: string;
  public errorMessage: string;
  public saving: boolean = false;

  constructor(public roomsManager: RoomsManagerService) {
    this.ageFromAvailable = this.roomsManager.AGES_FROM;
    this.ageToAvailable = this.roomsManager.AGES_TO;
  }

  ngOnInit() {
    this.resetForm();
    this.init();
  }

  ngOnChanges(changes) {
    if (changes.room.currentValue) {
      this.init();
    } else {
      this.resetForm();
    }
  }

  init() {
    if (this.room) {
      this.name = this.room.name;
      this.capacity = this.room.capacity;
      this.ecceCapitations = this.room.ecceCapitations;
      if (this.room.ageGroup) {
        let ageGroup = this.room.ageGroup.split('-');
        this.ageFrom = ageGroup[0];
        this.ageTo = ageGroup[1];
        this.ageGroup = this.room.ageGroup;
        this.ageToAvailable = this.ageToAvailable.filter((option, index) => {
          return index >= this.ageFromAvailable.indexOf(this.ageFrom) - 1;
        });
      }
    }
  }

  saveRoom() {
    if (this.isValid() && !this.saving) {
      this.saving = true;
      if (!this.room) {
        this.roomsManager.addRoom({
          name: this.name,
          ageGroup: this.ageGroup,
          capacity: +this.capacity,
          ecceCapitations: this.ecceCapitations
        }).toPromise().then(res => {
          this.saving = false;
          this.dismiss();
        }, error => {
          console.error(error);
        });
      } else {
        this.roomsManager.updateRoom({
          id: this.room.id,
          name: this.name,
          ageGroup: this.ageGroup,
          capacity: +this.capacity,
          ecceCapitations: this.ecceCapitations
        }).toPromise().then(res => {
          this.saving = false;
          this.dismiss();
        }, error => {
          console.error(error);
        });
      }
    } else {
      if (!this.name) {
        this.errorMessage = 'Room name is required';
      } else if (!this.ageGroup) {
        this.errorMessage = 'Age group boundaries should be set';
      } else if (!this.capacity) {
        this.errorMessage = 'Capacity has to be set';
      } else if (this.saving) {
        this.errorMessage = 'Processing Request';
      }
    }
  }

  resetForm() {
    this.name = '';
    this.ageFrom = null;
    this.ageTo = null;
    this.ageGroup = null;
    this.capacity = null;
    this.ecceCapitations = null;
    this.errorMessage = null;
    this.saving = false;
    this.ageFromAvailable = this.roomsManager.AGES_FROM;
    this.ageToAvailable = this.roomsManager.AGES_TO;
  }

  dismiss() {
    this.closeModal.emit();
    this.resetForm();
  }

  handleSelect(value: string, handler: string) {
    if (handler === 'from') {
      this.ageToAvailable  = this.roomsManager.AGES_TO
        .filter((option, index) => {
          return index >= this.ageFromAvailable.indexOf(value) - 1;
        });

      if(this.ageToAvailable.indexOf(this.ageTo) === -1) {
        this.ageTo = this.ageToAvailable[0];
      }
    }
    this.ageGroup = `${this.ageFrom}-${this.ageTo}`;
  }

  isValid() {
    return !!this.name &&
      !!this.ageGroup &&
      !!this.capacity &&
      !isNaN(Number(this.capacity));
  }

}
