import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-payments-view',
  templateUrl: './accordion-payments-view.component.html',
  styleUrls: ['./accordion-payments-view.component.scss', '../../easy-fees.component.scss']
})
export class AccordionPaymentsViewComponent implements OnInit {
  showPopup: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  printMandate(){
    this.showPopup = true;
  }

  popupClosed() {
    this.showPopup = false;
  }

}
