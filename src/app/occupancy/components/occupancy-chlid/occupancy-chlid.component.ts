import { Component, Output, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { occupancyModalAnimations } from '../occupancy-modal/occupancy-modal.animations';
import { Child, Rooms } from '../../occupancy.model';

@Component({
  selector: 'app-occupancy-chlid',
  templateUrl: './occupancy-chlid.component.html',
  styleUrls: ['./occupancy-chlid.component.scss', '../../occupancy.component.scss'],
  animations: [...occupancyModalAnimations]
})
export class OccupancyChlidComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter();

  @Input() showChildModal: boolean = false;
  @Input() child: Child;

  title: string = "";
  errorMessage: string = "";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.title = this.child.name;
  }

  destroy() {
    this.closeModal.emit('close');
  }

}
