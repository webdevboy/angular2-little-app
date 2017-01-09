import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() showDialog: boolean;
  @Input() message: string;
  @Output() closeDialog = new EventEmitter();
  constructor() { }

  close(output) {
    this.closeDialog.emit(output);
  }
}
