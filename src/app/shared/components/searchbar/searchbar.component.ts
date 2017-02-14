import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  Renderer
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  private activated: boolean = false;
  private filter = new FormControl();
  @Output() searchFilter: EventEmitter<any> = new EventEmitter();
  @ViewChild('textfield') textfield;
  @ViewChild('searchbar') searchbar;
  private subscriptions: Subscription;
  private clickEvents: any;
  constructor(
    private router: Router,
    private renderer: Renderer,
  ) {
    /* Close searchbar if not focused */
    this.clickEvents = this.renderer.listenGlobal('window', 'click', (evt) => {
      let isInside =
        this.searchbar.nativeElement.contains(evt.target)
        && (evt.target !== this.searchbar.nativeElement);

      if(!isInside && this.activated && !this.textfield.value) {
        this.activated = !this.activated;
      }
    });
  }

  ngOnInit() {
    const routerSubscription$ =
      this.router
        .events
        .filter(change => {
          return change instanceof NavigationStart;
        })
        .subscribe(change => {
          this.activated = false;
          this.textfield.value = '';
        });
    const inputSubscription$ =
      this.filter.valueChanges
        .debounceTime(500)
        .subscribe( filter => {
          this.searchFilter.emit(filter);
        });
    this.subscriptions = routerSubscription$;
    this.subscriptions.add(inputSubscription$);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.clickEvents();
  }

  toggleState() {
    this.activated = !this.activated;
  }
}
