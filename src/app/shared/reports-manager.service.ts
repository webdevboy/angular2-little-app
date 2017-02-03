import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { LiteAppAPI } from './lite-app-api';
import * as moment from 'moment';

@Injectable()
export class ReportsManagerService {

  private reports: { [key:string]:any[]; } = {};

  constructor(
    private http: HttpClientService
  ) {}

  resetReports() {
    this.reports = {};
  }

  loadReports (fromTimestamp: number, toTimestamp: number, selectedRoom: string) {
    let params = `?start=${fromTimestamp}&end=${toTimestamp}`;

    if (this.reports[params]) {
    	let reports = selectedRoom ? this.reports[params].filter(report => report.roomId == selectedRoom) : this.reports[params];
    	return new BehaviorSubject<any[]>(reports);
    }

    return this.http
      .get(LiteAppAPI.ATTENDANCE_REPORT + params)
      .map(res => {
        let results = res.json();

        let reports = results.map(result => {
          let singleOutput: any = {
            id: result.id,
            name: result.name,
            status: result.status,
            roomId: result.roomId
          };
          const weekDays = {
            Monday: {},
            Tuesday: {},
            Wednesday: {},
            Thursday: {},
            Friday: {}
          }

          singleOutput.records = result.attendanceRecords.reduce((prev, event) => {
            let weekDay: string = moment(event.time).format('dddd');
            let events = event.events.reduce((prev, _event) => {
              prev[_event.type] = moment(_event.time).format('HH:mm');
              return prev;
            }, {});
            prev[weekDay] = events;
            return Object.assign(weekDays, prev);
          }, {});


          return singleOutput;
        });

        if (toTimestamp < (new Date()).getTime()) {
          this.reports[params] = reports;
        }

        if (selectedRoom) {
          reports = reports.filter(report => report.roomId == selectedRoom);
        }

        return reports;
      }, console.error);
  }

}
