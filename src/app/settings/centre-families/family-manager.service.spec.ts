/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FamilyManagerService } from './family-manager.service';

describe('FamilyManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilyManagerService]
    });
  });

  it('should ...', inject([FamilyManagerService], (service: FamilyManagerService) => {
    expect(service).toBeTruthy();
  }));
});
