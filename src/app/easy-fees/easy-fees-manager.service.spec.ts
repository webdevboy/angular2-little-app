/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EasyFeesManagerService } from './easy-fees-manager.service';

describe('Service: EasyFeesManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasyFeesManagerService]
    });
  });

  it('should ...', inject([EasyFeesManagerService], (service: EasyFeesManagerService) => {
    expect(service).toBeTruthy();
  }));
});
