import { Component, Output, Input, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { addFamiliesModalAnimations } from './add-new-families.animations';
import { FamilyManagerService } from '../../family-manager.service';

import { Family, Guardian } from '../../family.model';
import { Child } from '../../../../shared/models/child.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-new-families',
  templateUrl: './add-new-families.component.html',
  styleUrls: ['./add-new-families.component.scss'],
  animations: [...addFamiliesModalAnimations]
})

export class AddNewFamiliesComponent implements OnChanges {
  @Output() closeModal = new EventEmitter();
  
  @Input() family: Family;
  @Input() rooms = [];

  @Input() showModal: boolean = false;
  @Input() isEdit: boolean = false;

  @Input() selectedTabIndex: number;
  @Input() maxID: number = 0;
 
  saving: boolean = false;
  isTablet: boolean = true;
  roomId: number = 0;
  errorMessage: string = "";

  //Fake init data
  initChild = {name: "", birthdate: "", roomId: 0, startdate: ""};
  initGuard = { name: "", email: "", phone: "", address: ""};

  constructor(private familyManager: FamilyManagerService) {
  }

  ngOnInit() {
   
  }

  ngOnChanges(){
    //when click add button for add new family, init family
    if( !this.isEdit ){
      this.family = new Family({id:this.maxID, childrens: [new Child(this.initChild)] ,guardians:[new Guardian(this.initGuard)]});
    }
    this.errorMessage = "";
  }

  destroy() {
    this.closeModal.emit('close');
  }
  
  //add another children
  addAnotherChild(){
    this.family.childrens.push( new Child(this.initChild) );
  }

  //add another guardain
  addAnotherGuard(){
    this.family.guardians.push( new Guardian(this.initGuard) );
  }
  
  //save family
  saveFamilies(){
    if( this.isValid() && !this.saving ) {
      this.saving = true;
      if(this.isEdit) {
        // this.familyManager.updateFamily(this.family).toPromise().then(() => {
        //   this.saving = false;
        //   this.destroy();
        // }, console.error);

        /**************************
         * update fake data
         */
        this.familyManager.updateFamily(this.family);
        this.saving = false;
        this.destroy();
        /************************** */
        
      } else {
        // this.familyManager.addFamily(this.family).toPromise().then(() => {
        //   this.saving = false;
        //   this.destroy();
        // }, console.error);

        /**************************
         * add fake data
         */
        this.familyManager.addFamily(this.family);
        this.saving = false;
        this.destroy();
        /************************** */
      }
    } else {
        this.errorMessage = 'All Required. Please!';
    }
      
  }

  isValid() {
    let valid: boolean = false;
    this.family.childrens.forEach( children => {
        if( children.name && children.birthdate && children.startdate ){
          valid = true;
        } else {
          valid =false;
        }
    });
    this.family.guardians.forEach( guardian => {
        if( guardian.name && guardian.email && guardian.phone && guardian.address ){
          valid = true;
        } else {
          valid =false;
        }
    });

    return valid;
  }

  //Click 1.add children or 2.add guardian then call.
  selectFamiliesType(idx: number){
    this.selectedTabIndex = idx;
  }
}
