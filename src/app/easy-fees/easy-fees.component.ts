import { Component, OnInit } from '@angular/core';
import { TNavRoute } from '../shared/models/general.model';

@Component({
  selector: 'app-easy-fees',
  templateUrl: './easy-fees.component.html',
  styleUrls: ['./easy-fees.component.scss']
})
export class EasyFeesComponent implements OnInit {
  public routes: TNavRoute[] = [{
    path: 'intro',
    link: 'Get Started'
  }, {
    path: 'setup',
    link: 'Easy Fees Setup'
  }];
  constructor() { }

  ngOnInit() {
  }

}
