import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionLecheComponent } from './recepcion-leche.component';

describe('RecepcionLecheComponent', () => {
  let component: RecepcionLecheComponent;
  let fixture: ComponentFixture<RecepcionLecheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionLecheComponent]
    });
    fixture = TestBed.createComponent(RecepcionLecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
