/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OccupancyComponent } from './occupancy.component';

describe('OccupancyComponent', () => {
  let component: OccupancyComponent;
  let fixture: ComponentFixture<OccupancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
