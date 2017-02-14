import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileManagerService } from '../../shared/profile-manager.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html'
})
export class LoginCardComponent implements OnInit {
  public username:string;
  public password:string;
  public loading:boolean;
  public errorMessage:string;
  constructor(
    public profileManager: ProfileManagerService,
    public router: Router
  ) { }

  ngOnInit() {}

  login() {
    if(this.username && this.password) {
      this.loading = true;
      this.profileManager.login(this.username, this.password).take(1).subscribe(profile => {
        this.router.navigate(['dashboard']);
      }, error => {
        this.loading = false;
        this.errorMessage = error.json().message;
      });
    } else {
      this.errorMessage = 'Please fill in the credentials';
    }
  }

}
