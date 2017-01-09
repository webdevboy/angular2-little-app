/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasyFeesComponent } from './easy-fees.component';

describe('EasyFeesComponent', () => {
  let component: EasyFeesComponent;
  let fixture: ComponentFixture<EasyFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
