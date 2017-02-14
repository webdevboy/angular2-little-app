import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ecce-capitations',
  templateUrl: './ecce-capitations.component.html',
  styleUrls: ['./ecce-capitations.component.scss']
})
export class EcceCapitationsComponent implements OnChanges {

  @Input() model;
  @Output() valueSet = new EventEmitter<string>();
  public value: string;

  constructor() { }

  ngOnChanges(changes) {
    this.value = changes.model.currentValue;
  }

  setValue(value) {
    if (this.value == value) {
      this.value = null;
    } else {
      this.value = value;
    }
    this.valueSet.emit(this.value);
  }

}
