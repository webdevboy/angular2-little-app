import { Component, OnDestroy } from '@angular/core';
import { Profile } from '../shared/models/profile.model';
import { ProfileManagerService } from '../shared/profile-manager.service';
import { SessionManagerService } from '../shared/session-manager.service';
import { Subscription } from 'rxjs';

// TODO: Profile Info needs expand/close
// MdlDialogOutlet issues (https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {

  private profile: Profile;
  private sub: Subscription;
  constructor(
    private profileManager: ProfileManagerService,
    private sessionManager: SessionManagerService
  ) {
    const profile = this.profileManager.getProfile();
    if(profile) {
      this.profile = profile;
    }
    this.sub = this.profileManager.store$.subscribe( profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.sessionManager.removeSession();
  }

}
