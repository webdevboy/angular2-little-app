import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TRoom } from './models/general.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { LiteAppAPI } from './lite-app-api';

const AGES_FROM: string[] =
  ['0','12 months','18 months','2 years','3 years','4 years','5 years'];
const AGES_TO: string[] =
  ['12 months','18 months','2 years','3 years','4 years','5 years','6 years'];


@Injectable()
export class RoomsManagerService {
  private rooms: TRoom[] = [];
  private store: BehaviorSubject<TRoom[]> = new BehaviorSubject([]);
  private centreId: string;
  constructor(private http: HttpClientService) {
    this.loadRooms().map(res => res.json()).subscribe(rooms => {
      this.rooms = rooms;
      this.store.next(this.rooms);
    }, error => {
      console.error('Error loading rooms', error);
    });
  }

  get store$() {
    return this.store.asObservable();
  }

  getRoomById(id: string): TRoom {
    return this.rooms.find(room => room.id === id);
  }

  getAll() {
    return this.rooms;
  }

  removeRoom(room: TRoom): TRoom[] {
    this.http.delete(LiteAppAPI.ROOMS_ENDPOINT + '/' + room.id).subscribe( res => {
      const index: number = this.rooms.findIndex(_room => _room.id === room.id);
      if (index !== -1) {
        this.rooms.splice(index, 1);
        this.store.next(this.rooms);
      } else {
        console.error('Room was not found');
      }
    },
    err => {
      console.log("Error Deleting Room " + room.name + " " + err);
    });
    return this.rooms;
  }

  addRoom(room: any): Observable<any> {
    return this.http.post(LiteAppAPI.ROOMS_ENDPOINT, room).flatMap(res => {
      this.rooms.push(res.json());
      this.store.next(this.rooms);
      return this.rooms;
    });
  }

  updateRoom(room: TRoom) {
    return this.http.put(LiteAppAPI.ROOMS_ENDPOINT + `/${room.id}`, room).flatMap(res => {
      this.rooms = this.rooms.map(_room => {
        if (_room.id === res.json().id) {
          return res.json()
        } else {
          return _room;
        }
      });
      this.store.next(this.rooms);
      return this.rooms;
    });
  }

  loadRooms() {
    return this.http.get(LiteAppAPI.ROOMS_ENDPOINT);
  }

  get AGES_FROM() {
    return [...AGES_FROM];
  }

  get AGES_TO() {
    return [...AGES_TO];
  }

}
