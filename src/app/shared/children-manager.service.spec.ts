/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ChildrenManagerService } from './children-manager.service';

describe('Service: ChildrenManager', () => {
  beforeEach(() => {
    addProviders([ChildrenManagerService]);
  });

  it('should ...',
    inject([ChildrenManagerService],
      (service: ChildrenManagerService) => {
        expect(service).toBeTruthy();
      }));
});
