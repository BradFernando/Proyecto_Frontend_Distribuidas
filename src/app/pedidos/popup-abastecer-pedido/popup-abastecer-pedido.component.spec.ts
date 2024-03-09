import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAbastecerPedidoComponent } from './popup-abastecer-pedido.component';

describe('PopupAbastecerPedidoComponent', () => {
  let component: PopupAbastecerPedidoComponent;
  let fixture: ComponentFixture<PopupAbastecerPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAbastecerPedidoComponent]
    });
    fixture = TestBed.createComponent(PopupAbastecerPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
