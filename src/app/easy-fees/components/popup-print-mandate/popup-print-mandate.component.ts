import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { popupAnimations } from './popup.animations';

@Component({
  selector: 'app-popup-print-mandate',
  templateUrl: './popup-print-mandate.component.html',
  styleUrls: ['./popup-print-mandate.component.scss', '../../easy-fees.component.scss'],
  animations: [...popupAnimations]
})
export class PopupPrintMandateComponent implements OnInit {
  @Input() showPopup: boolean = false;
  @Output() closePopup = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  destroy() {
    this.closePopup.emit('close');
  }
}