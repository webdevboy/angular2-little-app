import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClientService } from '../shared/http-client.service';
import { LiteAppAPI } from '../shared/lite-app-api';

import { Staff } from './occupancy.model';

@Injectable()
export class OccupancyService {
  private store: BehaviorSubject<any> = new BehaviorSubject({});
  private staffs: Staff[] = [];

  constructor( private http: HttpClientService ) {
    /***** Fake Data ******/
    this.staffs = [{
      id: "1", name:"Jane Doherty", qualification: "1", startdate: "", enddate: "", assignedRoom : { mon:{am:"1",pm:"2"}, tue:{am:"0",pm:"1"}, wed:{am:"1",pm:"2"}, thu:{am:"0",pm:"3"}, fri:{am:"1",pm:"2"} }
    }];

    this.store.next(this.staffs);
    /***** //Fake Data ******/
  }

  get store$() {
    return this.store.asObservable();
  }

  //add new Staff
  addStaff(staff: Staff) {
    
    /******** push fake data ********/
    this.staffs.push(staff);
    this.store.next(this.staffs);
    /******** //push fake data ********/
  }

  //update Staff by staff.id
  updateStaff(staff: Staff) {

    /******** push fake data ********/
    this.staffs = this.staffs.map(_staff => {
      return _staff.id === staff.id ? staff : _staff;
    });
    this.store.next(this.staffs);
    /******** //push fake data ********/
  }

}
