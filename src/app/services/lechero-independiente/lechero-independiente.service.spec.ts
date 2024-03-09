import { TestBed } from '@angular/core/testing';

import { LecheroIndependienteService } from './lechero-independiente.service';

describe('LecheroIndependienteService', () => {
  let service: LecheroIndependienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecheroIndependienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
