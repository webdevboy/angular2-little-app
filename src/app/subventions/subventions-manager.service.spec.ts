/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubventionsManagerService } from './subventions-manager.service';

describe('Service: SubventionsManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubventionsManagerService]
    });
  });

  it('should ...', inject([SubventionsManagerService], (service: SubventionsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
