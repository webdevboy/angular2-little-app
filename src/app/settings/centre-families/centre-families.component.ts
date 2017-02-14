import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoomsManagerService } from '../../shared/rooms-manager.service';
import { FamilyManagerService } from './family-manager.service';

import { TFlexOptions, TRoom } from '../../shared/models/general.model';
import { Family, Guardian } from './family.model';
import { Child } from '../../shared/models/child.model';

@Component({
  selector: 'app-centre-families',
  templateUrl: './centre-families.component.html',
  styleUrls: ['./centre-families.component.scss'],
  providers: [FamilyManagerService],
  encapsulation: ViewEncapsulation.None
})

export class CentreFamiliesComponent implements OnInit, OnDestroy {
  tableOptions: TFlexOptions;
  sub: Subscription;

  rooms: TRoom[];
  families: Family[] = [];
  pureStore: Family[] = [];
  selectedFamily: Family;
  
  showModal: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;

  selectedTabIndex: number = 0;
  maxID: number = 0;

  constructor(
    private familyManager: FamilyManagerService,
    private roomManager: RoomsManagerService
  ) {
    const families$ = this.familyManager.store$.subscribe(families => {
      this.families = families;
      this.pureStore = families;
    });
    const rooms$ = this.roomManager.store$.subscribe(rooms => {
      this.rooms = rooms;
    });

    this.sub = families$;
    this.sub.add(rooms$);
    
    this.tableOptions = {
                          tooltips: [{
                                          value: '',
                                          inactive: true,
                                          className: 'image-col'
                                      },{
                                          value: 'children',
                                          caption: 'Children',
                                          className: 'name-col'
                                      },{
                                          value: 'guardians',
                                          caption: 'Guardians',
                                          className: 'name-col'
                                      },{
                                          value: '',
                                          inactive: true,
                                          className: 'empty-col'
                                      }]
                        };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  modalClosed() {
    this.showModal = false;
  }

  //Click a row for edit or Add button for add new family
  controlFamilies(isEdit:boolean, family: Family, tab:number){
    this.isEdit = isEdit;
    if( !this.isEdit ){
      this.maxID = this.families.length;
      this.selectedFamily = null;
      this.selectedTabIndex = 0;
    }
    else{
      this.selectedTabIndex = tab;
      this.selectedFamily = family;
    }
    this.showModal = true;
  }

  //Get Children name list
  getChildrenNames( childrens: Child[]){
    let names: string = "";
    let childLenght: number = childrens.length; 
    childrens.forEach( child => {
      names += child.name;
      childLenght--;
      if( childLenght > 0 ){
        names += ", ";
      }
    });
    return names;
  }
  //Get Guardian name list
  getGuardianNames( guardians: Guardian[]){
    let names: string = "";
    let guardLenght: number = guardians.length; 
    guardians.forEach( guard => {
      names += guard.name;
      guardLenght--;
      if( guardLenght > 0 ){
        names += ", ";
      }
    });
    return names;
  }

  //Filter by children and guardian names
  handleFilter(filter: string) {
    let filterValue = filter.toLowerCase();
    this.families = this.pureStore.filter(family => {
      let familyName = "";
      family.childrens.forEach( children => {
         familyName += children.name.toLowerCase()+", ";
      });
      family.guardians.forEach( guardian => {
         familyName += guardian.name.toLowerCase()+", ";
      });
      return familyName.indexOf(filterValue) !== -1;
    });
  }

}
