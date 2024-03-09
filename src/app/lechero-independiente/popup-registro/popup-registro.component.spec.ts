import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroComponent } from './popup-registro.component';

describe('PopupRegistroComponent', () => {
  let component: PopupRegistroComponent;
  let fixture: ComponentFixture<PopupRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroComponent]
    });
    fixture = TestBed.createComponent(PopupRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
