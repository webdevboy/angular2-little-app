import { Component, OnInit, Input } from '@angular/core';
import { MdlSnackbarService } from 'angular2-mdl';
import { ChildrenManagerService } from '../../../shared/children-manager.service';
import { AttendanceStates } from '../../../shared/models/general.model';
import { Child } from '../../../shared/models/child.model';
import * as moment from 'moment';

// TODO: merge this component into attendance component

@Component({
  selector: 'app-presence-bar',
  templateUrl: './presence-bar.component.html',
  styleUrls: ['./presence-bar.component.scss']
})
export class PresenceBarComponent implements OnInit {
  @Input() public child: Child;
  public attendanceStates = AttendanceStates;
  constructor(
    private mdlSnackbarService: MdlSnackbarService,
    private childrenManager: ChildrenManagerService
  ){
  }

  ngOnInit() {}

  updateAttendance(action: number) {
    let time = (new Date()).getTime();
    this.childrenManager.updateAttendance(this.child, action, time).toPromise().then(res => {
      let actionName = AttendanceStates[action];
      let childName = this.child.name;
      let parsedTime = moment(time).format('HH:mm A');
      if (actionName == 'IN') {
        this.child.attendanceStateInTime = res.json().time;
      } else if (actionName == 'OUT') {
        this.child.attendanceStateOutTime = res.json().time;
      } else {
        this.child.attendanceStateInTime = null;
        this.child.attendanceStateOutTime = null;
      }
      if (this.child.attendanceStateInTime && this.child.attendanceStateOutTime) {
        this.child.attendanceState = this.child.attendanceStateInTime > this.child.attendanceStateOutTime ? 'IN' : 'OUT';
      } else if (this.child.attendanceStateInTime) {
        this.child.attendanceState = 'IN';
      } else if (this.child.attendanceStateOutTime) {
        this.child.attendanceState = 'OUT';
      } else {
        this.child.attendanceState = 'ABSENT';
      }
      this.mdlSnackbarService
          .showToast(`${childName} marked as ${actionName} at ${parsedTime}`);
    }, console.error);
  }

}
