import { Component, OnDestroy } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileManagerService } from '../../shared/profile-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-centre-subventions',
  templateUrl: './centre-subventions.component.html',
  styleUrls: ['./centre-subventions.component.scss']
})
export class CentreSubventionsComponent implements OnDestroy {
  private centre: any;
  private sub: Subscription;
  private saving: boolean = false;
  private editing: boolean = false;
  constructor(private profileManager: ProfileManagerService) {
    let profile = this.profileManager.getProfile();
    if(profile) {
      this.centre = JSON.parse(JSON.stringify(profile.additional));
    }
    this.sub = this.profileManager.store$.subscribe(profile => {
      this.centre = JSON.parse(JSON.stringify(profile.additional));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  valueSet(event) {
    console.log(event)
  }

  cancel() {
    this.editing = false;
    let profile = this.profileManager.getProfile();
    if (profile) {
      this.centre = JSON.parse(JSON.stringify(profile.additional));
    }
  }

  saveDetails() {
    this.saving = true;
    this.profileManager.updateCrecheProfile(this.centre).toPromise().then(
      res => {
        this.saving = false;
        this.editing = false;
      }, error => {
        this.saving = false;
        console.error(error);
      }
    )
  }

}
