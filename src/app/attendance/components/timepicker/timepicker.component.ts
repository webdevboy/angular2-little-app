import { Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnChanges {
  @Input() currentTime;
  @Output() timeChanged: EventEmitter<number> = new EventEmitter<number>();
  innerDate: any = moment();
  timeout: any;
  constructor() { }

  ngOnChanges(changes) {
    if (changes.currentTime.currentValue) {
      this.innerDate = moment(changes.currentTime.currentValue);
      this.updateTimeout();
    }
  }

  parseDate() {
    return this.innerDate.format('HH:mm A');
  }

  setTime() {
    this.timeChanged.emit(+this.innerDate.format('x'));
  }

  addMinutes() {
    this.innerDate.add('5', 'minutes');
    this.updateTimeout();
  }

  subtractMinutes() {
    this.innerDate.subtract('5', 'minutes');
    this.updateTimeout();
  }

  updateTimeout() {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.setTime(), 3000);
  }

}
