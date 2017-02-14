import { Component, Output, Input, EventEmitter } from '@angular/core';
import { occupancyModalAnimations } from './occupancy-modal.animations';

@Component({
  selector: 'app-occupancy-modal',
  templateUrl: './occupancy-modal.component.html',
  styleUrls: ['./occupancy-modal.component.scss'],
  animations: [...occupancyModalAnimations]
})
export class OccupancyModalComponent {
  @Output() closeModal = new EventEmitter();
  @Input() showOccupancyModal: boolean = false;
  @Input() title: string = "";
  @Input() name: string = "";
  constructor() {}

  destroy() {
    this.closeModal.emit('close');
  }
}
