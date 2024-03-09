import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroClienteComponent } from './popup-registro-cliente.component';

describe('PopupRegistroClienteComponent', () => {
  let component: PopupRegistroClienteComponent;
  let fixture: ComponentFixture<PopupRegistroClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroClienteComponent]
    });
    fixture = TestBed.createComponent(PopupRegistroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
