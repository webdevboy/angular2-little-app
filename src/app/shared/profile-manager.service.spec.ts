/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProfileManagerService } from './profile-manager.service';

describe('Service: ProfileManager', () => {
  beforeEach(() => {
    addProviders([ProfileManagerService]);
  });

  it('should ...',
    inject([ProfileManagerService],
      (service: ProfileManagerService) => {
        expect(service).toBeTruthy();
      }));
});
