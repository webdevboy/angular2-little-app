import { Injectable } from '@angular/core';
import { Child } from './models/child.model';
import { AttendanceStates } from './models/general.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { LiteAppAPI } from './lite-app-api';

@Injectable()
export class ChildrenManagerService {
  private children: Child[] = [];
  private store: BehaviorSubject<Child[]> = new BehaviorSubject([]);
  constructor(
    private http: HttpClientService
  ) {

    this.loadChildren().subscribe(children => {
      this.children = children;
      this.store.next(this.children)
    }, error => {
      console.error('Error loading children', error);
    })
  }

  get store$() {
    return this.store.asObservable();
  }
  getChildById(id:string):Child {
    return this.children.find(child => child.id === id);
  }

  getAll() {
    return this.children;
  }

  moveChild(child:Child, roomId:string): Child {
    const _child = this.getChildById(child.id);
    _child.roomId = roomId;
    this.store.next(this.children);
    return _child;
  }

  removeChild(child:Child):Child[] {
    //
    // RIDA: I think remove child API should return current child list for the room
    // if, others delete children at the same time, you'd be out of synch.
    //
    this.http.delete(LiteAppAPI.CHILDREN_ENDPOINT + '/' + child.id).subscribe( res => {
      console.log("DELETE returned " + res.json);
      const index:number = this.children.findIndex( _child => _child.id === child.id);
      if(index !== -1) {
        this.children.splice(index, 1);
        this.store.next(this.children);
      } else {
        console.error('Child was not found');
      }

    },
    err => {
        console.log("Error Deleting Child " + child.name + " " + err);
    });

    return this.children;
  }

  addChild(child:any): Observable<Child> {
    return this.http.post(LiteAppAPI.CHILDREN_ENDPOINT, child).map( res => {
      let _child = new Child(res.json());
      this.children.push(_child);
      this.store.next(this.children);
      return _child;
    });
  }

  updateChild(child: Child): Observable<Child> {
    child = child.toAPIFormat();
    return this.http.put(LiteAppAPI.CHILDREN_ENDPOINT + '/' + child.id, child).map( res => {
      let response = new Child(res.json());
      this.children = this.children.map(_child => {
        return _child.id === child.id ? response : _child;
      });
      this.store.next(this.children);
      return response;
    });
  }

  updateAttendance(child: Child, action, timestamp): Observable<any> {
    let roomId:string;
    switch(action) {
      case AttendanceStates.IN:
      case 'IN':
        roomId = child.roomId;
        break;
      case AttendanceStates.ABSENT:
      case 'ABSENT':
        roomId = 'ABSENT';
        break;
      case AttendanceStates.OUT:
      case 'OUT':
      default:
        roomId = '';
        break;
    }
    return this.http.put(LiteAppAPI.ATTENDANCE_CHECK(child.id), {
        time: timestamp,
        roomId: roomId,
        comment: ''
      });
  }

  loadChildren(): Observable<Child[]> {
    return this.http.get(LiteAppAPI.CHILDREN_ENDPOINT).map(response => {
      return response.json().map(child => new Child(child));
    });
  }

}
