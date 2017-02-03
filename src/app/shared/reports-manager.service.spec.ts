/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ReportsManagerService } from './reports-manager.service';

describe('Service: ReportsManager', () => {
  beforeEach(() => {
    addProviders([ReportsManagerService]);
  });

  it('should ...',
    inject([ReportsManagerService],
      (service: ReportsManagerService) => {
        expect(service).toBeTruthy();
      }));
});
