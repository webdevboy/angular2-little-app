import { Component, OnDestroy } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { ProfileManagerService } from '../../shared/profile-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-centre-details',
  templateUrl: './centre-details.component.html',
  styleUrls: ['./centre-details.component.scss']
})
export class CentreDetailsComponent implements OnDestroy {
  public profile: Profile;
  private sub: Subscription;
  private saving: boolean;
  constructor(private profileManager: ProfileManagerService) {
    const profile = this.profileManager.getProfile();
    if(profile) {
      this.profile = profile;
    }
    this.sub = this.profileManager.store$.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {

  }

  saveDetails() {
    this.saving = true;
    this.profileManager.updateCrecheProfile(this.profile.additional).toPromise().then(
      res => {
        this.saving = false;
      }, error => {
        this.saving = false;
        console.error(error);
      }
    )
  }
}
