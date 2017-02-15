import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public showLogin: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggleView(): void {
    this.showLogin = !this.showLogin;
  }

}
