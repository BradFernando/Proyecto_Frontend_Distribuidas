import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroPp4Component } from './popup-registro-pp4.component';

describe('PopupRegistroPp4Component', () => {
  let component: PopupRegistroPp4Component;
  let fixture: ComponentFixture<PopupRegistroPp4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroPp4Component]
    });
    fixture = TestBed.createComponent(PopupRegistroPp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
