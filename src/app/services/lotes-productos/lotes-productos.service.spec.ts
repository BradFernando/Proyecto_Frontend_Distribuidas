import { TestBed } from '@angular/core/testing';

import { LotesProductosService } from './lotes-productos.service';

describe('LotesProductosService', () => {
  let service: LotesProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotesProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
