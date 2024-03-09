import { TestBed } from '@angular/core/testing';

import { HaciendaLecheraService } from './hacienda-lechera.service';

describe('HaciendaLecheraService', () => {
  let service: HaciendaLecheraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaciendaLecheraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
