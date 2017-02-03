/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MoveClassComponent } from './move-class.component';

describe('MoveClassComponent', () => {
  let component: MoveClassComponent;
  let fixture: ComponentFixture<MoveClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
