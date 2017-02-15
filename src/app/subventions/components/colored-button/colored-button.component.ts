import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

// TODO: Does this need to be separate component ?

@Component({
  selector: 'app-colored-button',
  templateUrl: './colored-button.component.html',
  styleUrls: ['./colored-button.component.scss']
})
export class ColoredButtonComponent implements OnInit, OnChanges {

  @Input() message: string = 'Button';
  @Input() type: string;
  @Input() classes;
  @ViewChild('button') element;
  constructor() { }

  ngOnInit() {
    this.init();
    this.classes = this.classes ? this.classes.split(' ') : ' ';
  }
  ngOnChanges(changes) {
    if (changes.type && typeof changes.type.previousValue == 'string') {
      this.init(changes.type.previousValue);
    } else if (changes.message && typeof changes.message.previousValue == 'string') {
      this.init(changes.message.previousValue.toLowerCase().replace(' ', '-'));
    }
  }
  init(previousClass?: string) {
    if (previousClass) {
      this.element.nativeElement.classList.remove(previousClass);
    }
    if (this.type === 'status') {
      const ecceClass = this.message.toLowerCase().replace(' ', '-');
      this.element.nativeElement.classList.add(ecceClass);
    } else {
      this.element.nativeElement.classList.add(this.type);
    }
  }

}
