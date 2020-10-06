import { TestBed } from '@angular/core/testing';

import { RotaServiceService } from './rota-service.service';

describe('RotaServiceService', () => {
  let service: RotaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
