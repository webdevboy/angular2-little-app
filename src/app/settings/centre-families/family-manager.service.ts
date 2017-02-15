import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClientService } from '../../shared/http-client.service';
import { LiteAppAPI } from '../../shared/lite-app-api';

import { Family, Guardian } from './family.model';
import { Child } from '../../shared/models/child.model';

@Injectable()
export class FamilyManagerService {
  private families: Family[] = [];
  private child: Child;
  private store: BehaviorSubject<Family[]> = new BehaviorSubject([]);

  constructor( private http: HttpClientService ) {
    // this.loadFamilies().subscribe(families => {
    //   this.families = families;
    //   this.store.next(this.families);
    // }, error => {
    //   console.error('Error loading Family', error);
    // });
    
    /***** Fake Data ******/
    this.families = [{
      id: "1", name:"", childrens: [new Child({name:"Ben Mille", birthdate:"",roomId:"1", startdate:""})], guardians: [new Guardian({name:"mother",email:"m@mail.com",phone:"123456",address:"aaa"})]
    }];
    this.store.next(this.families);
    /***** //Fake Data ******/
  }

  get store$() {
    return this.store.asObservable();
  }
  //get Families by id
  getFamilyById(id:string):Family {
    return this.families.find(family => family.id === id);
  }
  //get all Families
  getAll() {
    return this.families;
  }

  //add new Family
  addFamily(family: Family)/*: Observable<Family>*/ {
    // return this.http.post(LiteAppAPI.FAMILY_ENDPOINT, family).map( res => {
    //   let _family = new Family(res.json());
    //   this.families.push(_family);
    //   this.store.next(this.families);
    //   return _family;
    // });

    /******** push fake data ********/
    this.families.push(family);
    this.store.next(this.families);
    /******** //push fake data ********/
  }

  //update Family by family.id
  updateFamily(family: Family)/*: Observable<Family>*/ {
    // return this.http.put(LiteAppAPI.FAMILY_ENDPOINT + '/' + family.id, family).map( res => {
    //   let response = new Family(res.json());
    //   this.families = this.families.map(_family => {
    //     return _family.id === family.id ? response : _family;
    //   });
    //   this.store.next(this.families);
    //   return response;
    // });

    /******** push fake data ********/
    this.families = this.families.map(_family => {
      return _family.id === family.id ? family : _family;
    });
    this.store.next(this.families);
    /******** //push fake data ********/
  }

  loadFamilies(): Observable<Family[]> {
    return this.http.get(LiteAppAPI.FAMILY_ENDPOINT).map(response => {
      return response.json().map(family => new Family(family));
    });
  }

}
