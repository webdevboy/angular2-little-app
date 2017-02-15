/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SessionManagerService } from './session-manager.service';

describe('Service: SessionManager', () => {
  beforeEach(() => {
    addProviders([SessionManagerService]);
  });

  it('should ...',
    inject([SessionManagerService],
      (service: SessionManagerService) => {
        expect(service).toBeTruthy();
      }));
});
