import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SessionManagerService } from './session-manager.service';
import { LiteAppAPI } from './lite-app-api';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {
  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });
  private currentToken: string;
  constructor(private http: Http, private sessionManager: SessionManagerService) {
    this.sessionManager.session$.subscribe(authState => {
      if (authState.authorized) {
        this.currentToken = authState.token;
        this.headers.set('x-auth-token', authState.token);
      } else {
        this.currentToken = null;
        this.headers.delete('x-auth-token');
      }
    });
  }

  requestLogin(username, password) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(LiteAppAPI.AUTH_ENDPOINT, JSON.stringify({ username, password }), { headers });
  }

  requestRegister(email, password, name, businessName) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      LiteAppAPI.REGISTER_ENDPOINT,
      JSON.stringify({ email, password, name, businessName }),
      { headers }
    );
  }

  requestVerification(token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      LiteAppAPI.VERIFICATION_ENDPOINT + `/${token}`,
      null,
      { headers }
    );
  }

  post(url, data) {
    return this.http.post(url, JSON.stringify(data), { headers: this.headers });
  }

  postMultipart(url, data: FormData) {
    let multipartHeaders = new Headers({});
    if(this.currentToken) {
      multipartHeaders.append('x-auth-token', this.currentToken);
    }
    return this.http.post(url, data, { headers: multipartHeaders });
  }

  get(url) {
    return this.http.get(url, { headers: this.headers });
  }

  put(url, data) {
    return this.http.put(url, JSON.stringify(data), { headers: this.headers });
  }

  delete(url) {
    return this.http.delete(url, { headers: this.headers} );
  }
}
