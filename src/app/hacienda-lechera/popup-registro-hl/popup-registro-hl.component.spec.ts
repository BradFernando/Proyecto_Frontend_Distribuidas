import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroHlComponent } from './popup-registro-hl.component';

describe('PopupRegistroHlComponent', () => {
  let component: PopupRegistroHlComponent;
  let fixture: ComponentFixture<PopupRegistroHlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroHlComponent]
    });
    fixture = TestBed.createComponent(PopupRegistroHlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
