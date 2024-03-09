import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroPv5Component } from './popup-registro-pv5.component';

describe('PopupRegistroPv5Component', () => {
  let component: PopupRegistroPv5Component;
  let fixture: ComponentFixture<PopupRegistroPv5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroPv5Component]
    });
    fixture = TestBed.createComponent(PopupRegistroPv5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
