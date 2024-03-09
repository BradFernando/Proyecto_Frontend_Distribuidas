import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroLppp5Component } from './popup-registro-lppp5.component';

describe('PopupRegistroLppp5Component', () => {
  let component: PopupRegistroLppp5Component;
  let fixture: ComponentFixture<PopupRegistroLppp5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroLppp5Component]
    });
    fixture = TestBed.createComponent(PopupRegistroLppp5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
