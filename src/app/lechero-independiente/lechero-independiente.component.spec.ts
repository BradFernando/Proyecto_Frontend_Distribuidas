import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecheroIndependienteComponent } from './lechero-independiente.component';

describe('LecheroIndependienteComponent', () => {
  let component: LecheroIndependienteComponent;
  let fixture: ComponentFixture<LecheroIndependienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecheroIndependienteComponent]
    });
    fixture = TestBed.createComponent(LecheroIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
