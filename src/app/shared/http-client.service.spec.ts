/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';

describe('Service: HttpClient', () => {
  beforeEach(() => {
    addProviders([HttpClientService]);
  });

  it('should ...',
    inject([HttpClientService],
      (service: HttpClientService) => {
        expect(service).toBeTruthy();
      }));
});
