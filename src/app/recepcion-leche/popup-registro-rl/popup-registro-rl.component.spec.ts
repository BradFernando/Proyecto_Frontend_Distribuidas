import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegistroRlComponent } from './popup-registro-rl.component';

describe('PopupRegistroRlComponent', () => {
  let component: PopupRegistroRlComponent;
  let fixture: ComponentFixture<PopupRegistroRlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupRegistroRlComponent]
    });
    fixture = TestBed.createComponent(PopupRegistroRlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
