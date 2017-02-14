import { Injectable } from '@angular/core'
import { Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { Profile } from './models/profile.model';
import { HttpClientService } from './http-client.service';
import { LiteAppAPI } from './lite-app-api';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class ProfileManagerService {
  private profile: Profile;
  private store: Subject<any> = new Subject();
  constructor(private http: HttpClientService, private sessionManager: SessionManagerService) {
    this.sessionManager.session$.filter( state => { return state.authorized; }).flatMap(() => {
      return this.loadProfile();
    }).subscribe(profile => {
      this.createProfileFromAuth(profile);
    });
  }

  login(username, password): Observable<Profile> {
    return this.http.requestLogin(username, password).flatMap(res => {
      let token = res.headers.get('x-auth-token');
      this.sessionManager.saveSession(token);
      return this.store$;
    });
  }

  loadProfile() {
    return this.http.get(LiteAppAPI.AUTH_ENDPOINT + '/profile').map(res => {
      return res.json();
    });
  }

  loadCrecheProfile() {
    return this.http
      .get(LiteAppAPI.FACILITY_PROFILE_ENDPOINT)
      .map(res => res.json());
  }

  updateCrecheProfile(centreData: any) {
    return this.http
      .put(LiteAppAPI.FACILITY_PROFILE_ENDPOINT, centreData)
      .map(res => {
        let crecheProfile = res.json();
        this.profile.additional = crecheProfile;
        this.store.next(this.profile);
        return res.json();
      });
  }

  get store$(): Observable<Profile> {
    return this.store.asObservable();
  }


  getProfile(): Profile {
    return this.profile;
  }

  createProfileFromAuth(profile: Profile): Observable<Profile> {
    this.profile = new Profile(profile);
    this.loadCrecheProfile().toPromise().then(crecheProfile => {
      this.profile.additional = crecheProfile;
      this.store.next(this.profile);
    }, console.error);
    return this.store$;
  }


  verifyProfile(code:string) {
    return this.http.requestVerification(code).switchMap(res => {
      let token = res.headers.get('x-auth-token');
      this.sessionManager.saveSession(token);
      return this.store$;
    });
  }

  updateFirstLogin() {
    return this.http.post(LiteAppAPI.AUTH_ENDPOINT + '/' + this.profile.email, null);
  }

}
