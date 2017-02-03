import {  Component, Output, Input, EventEmitter } from '@angular/core';
import { modalAnimations } from './modal.animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [...modalAnimations]
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  constructor() {}
}
