import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVerdetallesComponent } from './popup-verdetalles.component';

describe('PopupVerdetallesComponent', () => {
  let component: PopupVerdetallesComponent;
  let fixture: ComponentFixture<PopupVerdetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupVerdetallesComponent]
    });
    fixture = TestBed.createComponent(PopupVerdetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
