import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ChildrenManagerService } from '../../../shared/children-manager.service';
import { Child } from '../../../shared/models/child.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnChanges {

  @Output('closeModal') closeModal = new EventEmitter<string>();
  @Input() child: Child;
  @Input() rooms = [];
  name: string;
  birthdate: number;
  roomId: string;
  isEdit: boolean = false;
  errorMessage:string;
  saving: boolean = false;
  constructor(private childrenManager: ChildrenManagerService) { }

  ngOnChanges(changes) {
    if(changes.child && changes.child.currentValue) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.init();
  }

  init() {
    if(this.isEdit) {
      this.name = this.child.name;
      this.birthdate = this.child.birthdate;
      this.roomId = this.child.roomId;
    } else {
      this.name = '';
      this.birthdate = null;
      this.roomId = '';
    }
  }

  saveChild() {
    if(this.isValid() && !this.saving) {
      this.saving = true;
      if(this.isEdit) {
        let _name = this.child.name;
        let _birthdate = this.child.birthdate;
        let _roomId = this.child.roomId;
        let _room = this.child.room;
        let room = this.rooms.find(room => room.id == this.roomId);

        this.child.name = this.name;
        this.child.birthdate = this.birthdate;
        this.child.roomId = this.roomId;
        this.child.room = room ? room.name : '';

        this.childrenManager.updateChild(this.child).toPromise().then(() => {
          this.saving = false;
          this.dismiss(`Child "${this.child.name}" updated`);
        }, () => {
          this.child.name = _name;
          this.child.birthdate = _birthdate;
          this.child.roomId = _roomId;
          this.child.room = _room;
        });
      } else {
        this.childrenManager.addChild({
          name: this.name,
          birthdate: this.birthdate,
          roomId: this.roomId
        }).toPromise().then(() => {
          this.saving = false;
          this.dismiss('New Child added');
        }, console.error)
      }
    } else {
      if(!this.name) {
        this.errorMessage = 'Child name is required';
      } else if(!this.birthdate) {
        this.errorMessage = 'Child date of birth is required';
      } else if(!this.roomId) {
        this.errorMessage = 'Child room is required';
      } else if(this.saving) {
        this.errorMessage = 'Processing Request';
      }
    }
  }

  dismiss(message?: string) {
    this.closeModal.emit(message);
  }

  get date() {
    return this.birthdate ? moment.unix(this.birthdate/1000).format('Do MMMM YYYY') : null;
  }

  set date(value) {
    this.birthdate = +moment(value).format('x');
  }


  isValid() {
    return !!this.name && !!this.birthdate && !!this.roomId;
  }

}
