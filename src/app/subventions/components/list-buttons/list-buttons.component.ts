import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-list-buttons',
  templateUrl: './list-buttons.component.html',
  styleUrls: ['./list-buttons.component.scss']
})
export class ListButtonsComponent implements OnInit, OnChanges {
  @Input() buttons;
  @Input('values') inputValues;
  @Input() interactive;
  @Input() toggle: boolean = false;
  @Input() classes;
  @Output() change = new EventEmitter();
  labels = [];
  values = [];
  _buttons: any[];
  constructor() { }

  ngOnInit() {
    this.buttons.split('|').forEach(button => {
      if (button.indexOf('::') !== -1) {
        let parts = button.split('::');
        this.values.push(parts[0]);
        this.labels.push(parts[1]);
      } else {
        this.values.push(button);
        this.labels.push(button);
      }
    });
    this._buttons = this.calculateActive();
  }

  ngOnChanges(change) {
    if(change.inputValues.currentValue) {
      this._buttons = this.calculateActive();
    }
  }
  toggleChange(button) {
    if (this.toggle) {
      this._buttons.forEach(button => button.status = 'inactive');
    }
    button.status = button.status === 'active' ? 'inactive' : 'active';
    this.change.emit(this._buttons.filter(button => button.status === 'active').map(button => button.value));
  }
  calculateActive() {
    return this.values.map( (value, index) => {
      return {
        name: this.labels[index],
        value: value,
        status: (Array.isArray(this.inputValues) && this.inputValues.indexOf(value) !== -1) || this.inputValues == value ? 'active' : 'inactive'
      }
    });
  }

}
