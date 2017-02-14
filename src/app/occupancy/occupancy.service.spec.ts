/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OccupancyService } from './occupancy.service';

describe('OccupancyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccupancyService]
    });
  });

  it('should ...', inject([OccupancyService], (service: OccupancyService) => {
    expect(service).toBeTruthy();
  }));
});
