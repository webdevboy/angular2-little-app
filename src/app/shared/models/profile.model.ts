import { TPerson } from './general.model';
import { LiteAppAPI } from '../lite-app-api';
/**
 * Describes basic profile class.
 *
 */
export class Profile {
  id:string;
  name:string;
  picture:string;
  businessName:string;
  centreId: string;
  additional: any = {
    name: '',
    address1: '',
    address2: '',
    address3: '',
    mainContact: '',
    workPhone: '',
    mobilePhone: '',
    email: '',
    ecceSettings: {
      capitations: 'low'
    }
  };
  firstLogin: boolean;
  email:string;

  constructor(profile: TPerson) {
    Object.assign(this, profile);
    this.picture = LiteAppAPI.IMAGE_ENDPOINT + '/' + profile.picture;
  }

  toAPIFormat() {
    return Object.assign({}, this, {
      picture: this.picture.replace(LiteAppAPI.IMAGE_ENDPOINT + '/', '')
    });
  }
}
