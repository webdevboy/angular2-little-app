import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '[class.has-navbar]': 'true'
  }
})
export class NavbarComponent implements OnInit {
  @Input() title;
  constructor() { }

  ngOnInit() {
  }

}
