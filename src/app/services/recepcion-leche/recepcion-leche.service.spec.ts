import { TestBed } from '@angular/core/testing';

import { RecepcionLecheService } from './recepcion-leche.service';

describe('RecepcionLecheService', () => {
  let service: RecepcionLecheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionLecheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
