import { Child } from '../../shared/models/child.model';
//Guardian Model
export class Guardian {
  id:string;
  name:string;
  email:string;
  phone:string;
  address:string;

  constructor(data) {
    Object.assign(this, data);
  }
}

// Family model
export class Family {
  id:string;
  name?:string;
  childrens: Child[];
  guardians: Guardian[];

  constructor(data) {
    Object.assign(this, data);
  }
}
