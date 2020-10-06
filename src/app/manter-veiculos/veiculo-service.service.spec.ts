import { TestBed } from '@angular/core/testing';

import { VeiculoServiceService } from './veiculo-service.service';

describe('VeiculoServiceService', () => {
  let service: VeiculoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
