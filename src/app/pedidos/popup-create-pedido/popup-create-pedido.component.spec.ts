import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreatePedidoComponent } from './popup-create-pedido.component';

describe('PopupCreatePedidoComponent', () => {
  let component: PopupCreatePedidoComponent;
  let fixture: ComponentFixture<PopupCreatePedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCreatePedidoComponent]
    });
    fixture = TestBed.createComponent(PopupCreatePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
