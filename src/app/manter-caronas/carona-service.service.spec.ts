import { TestBed } from '@angular/core/testing';

import { CaronaServiceService } from './carona-service.service';

describe('CaronaServiceService', () => {
  let service: CaronaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaronaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
