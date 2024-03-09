import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCardHomeComponent } from './dash-card-home.component';

describe('DashCardHomeComponent', () => {
  let component: DashCardHomeComponent;
  let fixture: ComponentFixture<DashCardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashCardHomeComponent]
    });
    fixture = TestBed.createComponent(DashCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
