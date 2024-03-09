import { TestBed } from '@angular/core/testing';

import { DashCardHomeService } from './dash-card-home.service';

describe('DashCardHomeService', () => {
  let service: DashCardHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashCardHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
