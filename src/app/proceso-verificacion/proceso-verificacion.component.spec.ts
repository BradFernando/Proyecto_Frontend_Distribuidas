import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoVerificacionComponent } from './proceso-verificacion.component';

describe('ProcesoVerificacionComponent', () => {
  let component: ProcesoVerificacionComponent;
  let fixture: ComponentFixture<ProcesoVerificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesoVerificacionComponent]
    });
    fixture = TestBed.createComponent(ProcesoVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
