import { TestBed } from '@angular/core/testing';

import { CountryVisitedService } from './country-visited.service';

describe('CountryVisitedService', () => {
  let service: CountryVisitedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryVisitedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
