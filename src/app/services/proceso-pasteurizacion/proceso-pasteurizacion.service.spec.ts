import { TestBed } from '@angular/core/testing';

import { ProcesoPasteurizacionService } from './proceso-pasteurizacion.service';

describe('ProcesoPasteurizacionService', () => {
  let service: ProcesoPasteurizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoPasteurizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
