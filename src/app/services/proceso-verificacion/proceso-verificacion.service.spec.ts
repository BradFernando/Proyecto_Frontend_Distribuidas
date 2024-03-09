import { TestBed } from '@angular/core/testing';

import { ProcesoVerificacionService } from './proceso-verificacion.service';

describe('ProcesoVerificacionService', () => {
  let service: ProcesoVerificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoVerificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
