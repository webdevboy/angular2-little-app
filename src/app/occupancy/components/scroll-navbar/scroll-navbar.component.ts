import { Component, OnInit, Input, Output, ViewChild, OnChanges, SimpleChanges, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-scroll-navbar',
  templateUrl: './scroll-navbar.component.html',
  styleUrls: ['./scroll-navbar.component.scss']
})

export class ScrollNavbarComponent implements OnInit, OnChanges {
  @ViewChild('nav') nav;
  @ViewChild('arrow') arrowRight;
  @Input() datas: any;
  @Output() sendData = new EventEmitter();

  scrollElement: HTMLElement;
  currentTranslation: number = 0;
  thresholdLeft: number = 0;
  thresholdRight: number;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  boundTransition: any;
  private arrowWidth: number = 60;

  constructor() {
    this.boundTransition = this.handleTransition.bind(this);
  }

  selectData(id: string) {
    this.sendData.emit(id);
  }

  ngOnInit() {
    this.scrollElement = this.nav.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    let datas = changes['datas'].currentValue;
    if (datas && datas.length) {
      // TODO: Fix Change Detection Strategy
      setTimeout(_ => {
        [this.showRightArrow, this.showLeftArrow] = this.shouldShowArrows();
      }, 500);
    } else if(!changes['datas'].isFirstChange()) {
      console.log('Please provide datas');
    }
  }

  onResize(event) {
    if (this.datas && this.datas.length) {
      this.thresholdRight = this.calculateRightThreshold();
      [this.showRightArrow, this.showLeftArrow] = this.shouldShowArrows();
      // Reset transform
      this.transformScroll(0, false);
    }
  }
  /**
   *  Returns [boolean, boolean] corresponding right arrow, left arrow.
   */
  shouldShowArrows(): boolean[] {
    const parentBoundingRect = this.scrollElement.parentElement.getBoundingClientRect();
    const scrollBoundingRect = this.scrollElement.getBoundingClientRect();
    const threshold = this.calculateRightThreshold();
    if (parentBoundingRect.width - this.arrowWidth * 2 > scrollBoundingRect.width) {
      return [false, false];
    }
    return [
      !!threshold,
      !!this.currentTranslation
    ];
  }

  calculateRightThreshold(): number {
    const arrowEl = this.arrowRight.nativeElement;
    const arrowBoundingRect = arrowEl.getBoundingClientRect();
    const lastChildBoundingRect = this.getLastChild();
    this.arrowWidth = arrowBoundingRect.width;
    return arrowBoundingRect.left - lastChildBoundingRect.right;
  }

  // TODO: Test, if translition completes when there is no element in the remaining space
  scroll(direction: string = 'left'): void {
    if (!this.thresholdRight) {
      this.thresholdRight = this.calculateRightThreshold();
    }

    let shift;
    let scrollPower = (width: number) => Math.max(this.arrowWidth, width);
    if (direction === 'right') {
      let last = this.getLastChild();
      let lastVisible = this.getLastVisibleChild();
      if(last.left === lastVisible.left) {
        shift = this.thresholdRight;
      } else {
        shift = Math.max(this.currentTranslation - scrollPower(last.width)*2, this.thresholdRight);
      }
    } else {
      let first = this.getFirstChild();
      let firstVisible = this.getFirstVisibleChild();
      if(first.left === firstVisible.left) {
        shift = this.thresholdLeft;
      } else {
        shift = Math.min(this.currentTranslation + scrollPower(first.width)*2, this.thresholdLeft);
      }
    }

    this.transformScroll(shift);
  }

  transformScroll(shift:number, notify:boolean = true) {
    this.scrollElement.style.transform = `translateX(${shift}px)`;
    this.currentTranslation = shift;
    if(notify) {
      this.scrollElement.addEventListener('transitionend', this.boundTransition, false);
    }
  }

  handleTransition() {
    [this.showRightArrow, this.showLeftArrow] = this.shouldShowArrows();
    this.scrollElement.removeEventListener('transitionend', this.boundTransition, false);
  }

  getLastVisibleChild(): ClientRect {
    let items = this.scrollElement.children;
    let offsetWidth = this.scrollElement.parentElement.offsetWidth - this.arrowWidth * 2;
    for (let i = 0; i < items.length; i++) {
      let itemBr = items[i].getBoundingClientRect();
      if (offsetWidth <= itemBr.left) {
        return itemBr;
      }
    }

    return this.getLastChild();
  }

  getFirstVisibleChild(): ClientRect {
    let items = this.scrollElement.children;
    for (let i = 0; i < items.length; i++) {
      let itemBr = items[i].getBoundingClientRect();
      if (itemBr.right >= this.arrowWidth) {
        return itemBr;
      }
    }

    return this.getFirstChild();
  }
  getLastChild(): ClientRect {
    let children = this.scrollElement.children;
    return children[children.length - 1].getBoundingClientRect();
  }
  getFirstChild(): ClientRect {
    let children = this.scrollElement.children;
    return children[0].getBoundingClientRect();
  }

}
