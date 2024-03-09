import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoPasteurizacionComponent } from './proceso-pasteurizacion.component';

describe('ProcesoPasteurizacionComponent', () => {
  let component: ProcesoPasteurizacionComponent;
  let fixture: ComponentFixture<ProcesoPasteurizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesoPasteurizacionComponent]
    });
    fixture = TestBed.createComponent(ProcesoPasteurizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
