import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { sortBy } from '../../utils';

const shadowLevels = [2,3,4,6,8,16,24];

@Component({
  selector: 'app-flex-card',
  templateUrl: './flex-card.component.html',
  styleUrls: ['./flex-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlexCardComponent implements OnInit, OnChanges {
  @Input() public collection: any[];
  @Input() public options: any;
  @Input() public loading: boolean;
  public currentSort: any;
  public tableShadow: number;
  constructor() { }

  ngOnInit() {
    let shadow = this.options.shadow || 3;
    if(shadow) {
      if(shadowLevels.indexOf(shadow) !== -1) {
        this.tableShadow = shadow;
      } else {
        console.error('Available shadow levels: ', shadowLevels.join(', '));
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let collection = changes['collection'];
    if(collection && collection.currentValue.length !==0) {
      if(this.currentSort) {
        this.changeSort(this.currentSort.type, this.currentSort.down);
      } else {
        this.changeSort('name', true);
      }
    }
  }

  changeSort(type: string, forceDown?:boolean) {
    let handler;
    let down:boolean = true;
    if(typeof forceDown === 'undefined') {
      if(this.currentSort && type === this.currentSort.type) {
        down = !this.currentSort.down;
      }
    } else {
      down = forceDown;
    }
    this.currentSort = { type, down };
    let sortType =
      this.options.tooltips
      .filter(tooltip => !!tooltip.sortTransform)
      .find(tooltip => {
        return tooltip.value === type;
      });
    if(sortType) {
      handler = sortBy.bind(this, type, this.collection, down, sortType.sortTransform);
    } else {
      handler = sortBy.bind(this, type, this.collection, down);
    }

    this.collection = handler();
  }

  resolveClass(handler: string) {
    if (this.currentSort && this.currentSort.type === handler) {
      return this.currentSort.down ? 'arrow-down' : 'arrow-up'
    }
    return '';
  }

}
