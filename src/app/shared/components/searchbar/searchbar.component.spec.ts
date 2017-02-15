/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { Router } from '@angular/router';

describe('Component: Searchbar', () => {
  it('should create an instance', inject([Router], (router: Router) => {
    let component = new SearchbarComponent(router);
    expect(component).toBeTruthy();
  }));
});
