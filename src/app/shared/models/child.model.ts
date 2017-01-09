import { TPerson } from './general.model';
import { LiteAppAPI } from '../lite-app-api';

// REVIEW
export class Child {
  id:string;
  name:string;
  picture:string;
  birthdate: number;
  startdate: number;
  room?:string; // still optional ?
  roomId:string;
  attendanceState: string;
  attendanceStateInTime: number;
  attendanceStateOutTime: number;
  editState?:string;

  constructor(data) {
    Object.assign(this, data);
    this.picture = LiteAppAPI.IMAGE_ENDPOINT + '/' + this.picture;
  }

  toAPIFormat() {
    // Object assign to create a new object, in order not to mutate current
    // Child Object. Otherwise it triggers view render.
    return Object.assign({}, this, {
      picture: this.picture.replace(LiteAppAPI.IMAGE_ENDPOINT + '/', '')
    });
  }
}
