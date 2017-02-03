/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { RoomsManagerService } from './rooms-manager.service';

describe('Service: RoomsManager', () => {
  beforeEach(() => {
    addProviders([RoomsManagerService]);
  });

  it('should ...',
    inject([RoomsManagerService],
      (service: RoomsManagerService) => {
        expect(service).toBeTruthy();
      }));
});
