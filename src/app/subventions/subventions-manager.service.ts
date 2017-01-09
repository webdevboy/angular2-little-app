import { Injectable }   from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClientService }  from '../shared/http-client.service';
import { LiteAppAPI }   from '../shared/lite-app-api';
import { TGrant } from '../shared/models/general.model';

@Injectable()
export class SubventionsManagerService {
  private grants: TGrant[] = [];
  private store: Subject<TGrant[]> = new Subject<TGrant[]>();
  constructor(private httpService: HttpClientService) {}

  get store$(): Observable<TGrant[]> {
    return this.store.asObservable();
  }

  getChildren(): Observable<TGrant[]> {
    return this.httpService.get(LiteAppAPI.ECCE_CHILDREN_ENDPOINT)
      .map(res => {
        let grants = res.json();
        return grants.map(this.grantFromResponse);
      }).do(grants => {
        this.grants = grants;
        this.store.next(grants);

        return this.store$;
      }, e => {
        this.handleError(e);
      })
  }

  grantFromResponse(response): TGrant {
    // REVIEW: do this on the server ?
    response.days = response.days || [];
    response.status = !!response.status;
    response.extras = {
                        meals: response.extras.meals || 0,
                        trips: response.extras.trips || 0,
                        hours: response.extras.hours || 0,
                        other: response.extras.other || 0,
                        voluntary: response.extras.voluntary || 0
                      };
    return response;
  }

  updateChildDetails(child:any) {
    return this.httpService.put(LiteAppAPI.UPDATE_SUBVENTION(child.id), child)
      .map(res => {
        let grant = this.grantFromResponse(res.json());
        this.grants = this.grants.map(_child => {
          if(_child.id === grant.id) {
            return Object.assign({}, _child, grant);
          }
          return _child;
        });
        this.store.next(this.grants);
        return grant;
      });
  }

  private handleError(error) {
    console.error('An error occurred', error);
    return error;
  }
}
