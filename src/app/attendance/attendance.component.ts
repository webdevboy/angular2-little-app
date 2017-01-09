import {
  Component, OnInit, OnDestroy,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlSnackbarService, MdlDialogOutletService } from 'angular2-mdl';
import { ChildrenManagerService } from '../shared/children-manager.service';
import { RoomsManagerService } from '../shared/rooms-manager.service';
import { Child } from '../shared/models/child.model';
import {
  TNavRoute,
  TRoom,
  AttendanceStates,
  TFlexOptions
} from '../shared/models/general.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AttendanceComponent implements OnInit, OnDestroy {

  private rooms: TRoom[] = [];
  public routes: TNavRoute[];
  public children: Child[];
  public store: Child[];
  public selectedRoomId: string;
  public currentTime: number;
  public sub: Subscription;
  public loading: boolean = false;
  public tableOptions: TFlexOptions;

  constructor(
    public childrenManager: ChildrenManagerService,
    private route: ActivatedRoute,
    private roomsManager: RoomsManagerService,
    private mdlSnackbarService: MdlSnackbarService,
    private mdlDialogOutletService: MdlDialogOutletService,
    private vcr: ViewContainerRef
  ) {

    this.mdlDialogOutletService.setDefaultViewContainerRef(this.vcr);

    this.tableOptions = {
      shadow: 2,
      tooltips: [
        {
          value: '',
          inactive: true
        },
        {
          value: 'name',
          caption: 'Name',
          sortTransform: (name) => name.toLowerCase()
        },
        {
          value: 'Presence',
          className: 'presence-col',
          inactive: true
        },
        {
          value: 'attendanceStateInTime',
          caption: 'Time IN',
          className: 'time-col',
        },
        {
          value: 'attendanceStateOutTime',
          caption: 'Time OUT',
          className: 'time-col'
        }
      ]
    }
    // is filter( room => room.capacity > 0 ) needed ?
    const rooms$ = this.roomsManager.store$.subscribe(rooms => {
      if (rooms.length) {
        this.rooms = rooms;
        let routes = [
          {
            path: '/dashboard/attendance/all',
            link: 'All Rooms',
          }
        ].concat(rooms.map(item => {
          return {
            path: '../' + item.id,
            link: item.name
          }
        }));
        this.routes = routes;
      } else {
        this.routes = [
          {
            path: '/dashboard/attendance/all',
            link: 'All Rooms',
          }
        ]
      }
    });

    this.sub = this.childrenManager.store$.subscribe(children => {
      this.store = children;
      if(!this.selectedRoomId) {
        this.children = [...this.store];
      } else {
        this.children = this.store.filter(child => {
          return child.roomId === this.selectedRoomId;
        });
      }
    });
    this.sub.add(rooms$);
  }

  ngOnInit() {
    const params$ = this.route.params.subscribe(params => {
      let param = params['id'];
      this.selectedRoomId = param === 'all' ? null : param;
      if(!this.selectedRoomId) {
        this.children = [...this.store];
      } else {
        this.children = this.store.filter(child => {
          return child.roomId === this.selectedRoomId;
        });
      }
    });

    this.sub.add(params$);
  }

  ngOnDestroy() {
    if(!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  updateAttendance(child: Child, action: string, time: number) {
    this.childrenManager.updateAttendance(child, action, time).toPromise().then(res => {
      let actionName = action;
      let childName = child.name;
      let parsedTime = moment(time).format('HH:mm A');
      if (actionName == 'IN') {
        child.attendanceStateInTime = res.json().time;
      } else if (actionName == 'OUT') {
        child.attendanceStateOutTime = res.json().time;
      }
      if (child.attendanceStateInTime && child.attendanceStateOutTime) {
        child.attendanceState =
          child.attendanceStateInTime > child.attendanceStateOutTime
          ? 'IN' : 'OUT';
      }
      child.editState = null;
      this.mdlSnackbarService
        .showToast(`${childName} marked as ${actionName} at ${parsedTime}`);
    }, console.error);
  }

  handleTimechange(date: number, child: Child) {
    this.updateAttendance(child, child.editState, date);
  }

  handleFilter(filter: string) {
    let filterValue = filter.toLowerCase();
    this.children = this.store.filter(child => {
      let childName = child.name.toLowerCase();
      if (!this.selectedRoomId) {
        return childName.indexOf(filterValue) !== -1;
      } else {
        return childName.indexOf(filterValue) !== -1
          && child.roomId === this.selectedRoomId;
      }
    });
  }

  getAttendanceStatusTime(child: Child, state: string) {
    if (state == 'IN' && child.attendanceStateInTime) {
      return moment(child.attendanceStateInTime).format('HH:mm A');
    } else if (state == 'OUT' && child.attendanceStateOutTime) {
      return moment(child.attendanceStateOutTime).format('HH:mm A');
    } else {
      return '-';
    }
  }

  editTime(child: Child, status: string) {
    if ((status == 'IN' && !child.attendanceStateInTime) || (status == 'OUT' && !child.attendanceStateOutTime)) {
      return;
    }
    this.children.forEach(child => child.editState = null);
    child.editState = status;
    this.currentTime = status == 'IN' ? child.attendanceStateInTime : child.attendanceStateOutTime;
  }

}
