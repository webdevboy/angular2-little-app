import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsManagerService } from '../shared/rooms-manager.service';
import { ReportsManagerService } from '../shared/reports-manager.service';
import { TNavRoute, TRoom } from '../shared/models/general.model';
import { Subject, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  private rooms: TRoom[] = [];
  private sub: Subscription;
  public selectedWeek$: Subject<any> = new Subject();
  public routes: TNavRoute[];
  public currentDate: moment.Moment = moment().startOf('isoWeek');
  public reports: any[];
  public selectedRoom: string;
  public week: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private roomsManager: RoomsManagerService,
    private reportsManager: ReportsManagerService
  ) {

    const rooms$ = this.roomsManager.store$.subscribe(rooms => {
      if(rooms.length) {
        this.rooms = rooms;
        let routes = [
          {
            path: '/dashboard/reports/all',
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
            path: '/dashboard/reports/all',
            link: 'All Rooms',
          }
        ]
      }
    });

    this.sub = this.selectedWeek$.switchMap(week => {
      return this.reportsManager.loadReports(week.start, week.end, this.selectedRoom);
    }).subscribe(reports => {
      this.reports = reports.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    }, e => {
      console.error(e);
    });

    this.sub.add(rooms$);

    this.dateChange();
  }

  ngOnInit() {
    const params$ = this.route.params.subscribe(params => {
      this.selectedRoom = params['id'] !== 'all' ? params['id'] : null;
      this.dateChange();
    });
    this.sub.add(params$);
  }

  ngOnDestroy() {
    if(!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  prevMonth() {
    this.currentDate.subtract(1, 'month');
    this.dateChange();
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.dateChange();
  }

  prevWeek() {
    this.currentDate.subtract(1, 'week');
    this.dateChange();
  }

  nextWeek() {
    this.currentDate.add(1, 'week');
    this.dateChange();
  }

  dateChange() {
    let startOfWeek = moment(this.currentDate).startOf('isoWeek');
    let currentWeek = { start: +startOfWeek.format('x'), end: 0 };
    let daysOfWeek = [];

    while(startOfWeek.isoWeekday() <= 5) {
      daysOfWeek.push({
        day: startOfWeek.format('dddd'),
        date: startOfWeek.format('MMM Do'),
        inactive: !startOfWeek.isSame(moment(this.currentDate), 'month')
      });
      startOfWeek.add(1, 'day');
    }
    currentWeek.end = +startOfWeek.format('x');
    this.week = daysOfWeek;

    this.selectedWeek$.next(currentWeek);
  }

  printReport() {
    // var printContents = document.getElementById("reportDiv").innerHTML;
    // var popupWin = window.open('', '_blank', 'width=600,height=400');
    // popupWin.document.open();
    // popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    // popupWin.document.close();
  }

}
