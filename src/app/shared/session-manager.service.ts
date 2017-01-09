import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'angular2-cookie/core';
import { TAuthState } from './models/general.model';
import * as moment from 'moment';

@Injectable()
export class SessionManagerService {
  public authState: TAuthState;
  private _authState;

  constructor(private cookieService: CookieService) {
    const token = cookieService.get('x-auth-token');
    this.authState = token ? {
      authorized: true,
      token
    } : {
        authorized: false
      };
    this._authState = new BehaviorSubject(this.authState);
  }

  get session$() {
    return this._authState.asObservable();
  }

  saveSession(token: string, remember: boolean = false) {
    const expireDate: Date = moment().add(10, 'days').toDate();
    this.cookieService.put('x-auth-token', token, { expires: expireDate });
    this.authState = {
      authorized: true,
      token: token
    };
    this._authState.next(this.authState);
  }

  removeSession() {
    this.cookieService.remove('x-auth-token');
    this.authState = { authorized: false };
    this._authState.next(this.authState);
  }

}
