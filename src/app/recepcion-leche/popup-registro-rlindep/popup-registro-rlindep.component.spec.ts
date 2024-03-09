import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroRlindepComponent } from './popup-registro-rlindep.component';

describe('PopupRegistroRlindepComponent', () => {
  let component: PopupRegistroRlindepComponent;
  let fixture: ComponentFixture<PopupRegistroRlindepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroRlindepComponent]
    });
    fixture = TestBed.createComponent(PopupRegistroRlindepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
