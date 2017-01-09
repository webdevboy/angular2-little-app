//Day type ie: am and pm
export type Dtype = {
    am: string;
    pm: string;
}
//qualification type
export type QualificationType = {
    id: string;
    name: string;
}
//week type
export type Weeks = {
    mon: Dtype;
    tue: Dtype;
    wed: Dtype;
    thu: Dtype;
    fri: Dtype;
}
//Age group
export type AgeGroup = {
    id: string;
    name: string;
    serviceType: number;
    adultNo: number;
    childNo: number;
}
//room model(fake model for testing)
export class Rooms {
  id:string;
  name:string;
  ageGroup:string;
  capacity: Weeks;
  ecceCapitations:string;
  transitionRoom: string;
  transitionAge: string;
  selected?:boolean;
  assignedStaff: Staff[];

  constructor(data) {
    Object.assign(this, data);
  }
}
//staff model
export class Staff {
  id:string;
  name:string;
  qualification:string;
  startdate:string;
  enddate?:string;
  assignedRoom: Weeks;

  constructor(data) {
    Object.assign(this, data);
  }
}
//child model
export class Child {
    id: string;
    name: string;
    age: string;
    officialStartdate: string;
    roomStartdate: string;
    roomEnddate: string;
    assignedState: BWeeks;
    assignedRoom: string;
    movetoRoom: string;
    movetoDate: string;
    parentName: string;
    parentEmail: string;
    deposit: string;
    birthdate: string;
    paperwork?: boolean;

    constructor(data) {
        Object.assign(this, data);
    }
}

//Day type ie: am and pm
export type DBtype = {
    am: boolean;
    pm: boolean;
}

//week type
export type BWeeks = {
    mon: DBtype;
    tue: DBtype;
    wed: DBtype;
    thu: DBtype;
    fri: DBtype;
}

//dashboard room information model
export class DashBoardRoomInfo{
    id: string;
    roomId: string;
    capacity: number;
    accordionState: boolean;
    roomInfo: RoomInfo[];

    constructor(data){
        Object.assign(this, data);
    }
}
//personInfo type
export type PersonInfo = {
    staff: Staff[];
    child: Child[];
}
//roomInfo type
export class RoomInfo{
    id: string;
    mdate: string;
    personInfo: PersonInfo;
    available: Dtype;
    active: boolean;

    constructor(data){
        Object.assign(this, data);
    }
}
