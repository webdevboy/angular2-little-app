import { Component, OnInit, OnDestroy }  from '@angular/core';
import { ActivatedRoute, Router }     from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileManagerService } from '../shared/profile-manager.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public message: string = 'Please check your email and follow the link to confirm your email address.';
  private sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileManager: ProfileManagerService
  ) {}

  ngOnInit() {
    let verificationCode: string;
    this.sub = this.route.params.filter(params => !!params['token']).switchMap((params) => {
      verificationCode = params['token'];
      this.loading = true;
      this.message = 'Verifying your account.';
      return this.profileManager.verifyProfile(verificationCode);
    }).subscribe( res => {
      this.router.navigate(['dashboard']);
    }, error => {
      this.loading = false;
      try {
        let errorBody = error.json();
        this.message = errorBody.message || 'Failed to verify your account.';
      } catch(e) {
        this.message = 'Invalid or expired code: ' + verificationCode;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
